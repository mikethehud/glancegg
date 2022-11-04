package main

import (
	"database/sql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/jmoiron/sqlx"
	"github.com/mikethehud/glancegg/packages/server/graph/generated"
	"github.com/mikethehud/glancegg/packages/server/graph/resolver"
	"github.com/mikethehud/glancegg/packages/server/service"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
	"github.com/pressly/goose"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
)

const (
	dbDriver     = "postgres"
	migrationDir = "db/migrations"
	graphqlPort  = "8080"
)

func main() {
	log := logrus.New()

	// load env
	env := "development"
	if os.Getenv("ENV") != "" {
		env = os.Getenv("ENV")
	}
	err := godotenv.Load(".env." + env)
	if err != nil {
		panic(err)
	}
	log.Infof("Environment: %s", env)

	// select mode
	mode := "graphql"
	if len(os.Args) > 1 {
		mode = os.Args[1]
	}
	log.Infof("Mode selected: %s", mode)

	// connect db
	dbx, err := connectDB(os.Getenv("DB_CONNECTION"))
	if err != nil {
		log.Error(errors.Wrap(err, "Error connecting to database"))
		return
	}

	switch mode {
	case "migrate":
		RunMigrate(log, dbx)
	case "graphql":
		RunServer(log, dbx)
	}
}

// connectDB establishes a connection the db
func connectDB(dsn string) (*sqlx.DB, error) {
	db, err := sql.Open(dbDriver, dsn)
	if err != nil {
		return nil, errors.Wrap(err, "invalid connection string")
	}

	dbx := sqlx.NewDb(db, dbDriver)
	if err := dbx.Ping(); err != nil {
		return nil, errors.Wrap(err, "could not establish connection to database")
	}

	return dbx, nil
}

func RunMigrate(log *logrus.Logger, dbx *sqlx.DB) {
	if err := goose.SetDialect(dbDriver); err != nil {
		log.Error(errors.Wrap(err, "failed to set dialect"))
		return
	}
	if err := goose.Up(dbx.DB, migrationDir); err != nil {
		log.Error(errors.Wrap(err, "failed to run migration"))
		return
	}
	log.Info("Migration finished!")
}

func RunServer(log *logrus.Logger, dbx *sqlx.DB) {
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		// todo: make cors stricter
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	r.Use(authTokenMiddleware())
	r.Use(refreshTokenMiddleware())
	r.Use(cookieWriterMiddleWare())

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{
		Resolvers: &resolver.Resolver{
			Service: service.NewService(dbx, types.NewValidator(), log),
		},
	}))

	log.Infof("Starting graphql on port %s", graphqlPort)
	log.Infof("Visit playground on http://localhost:%s/graphiql", graphqlPort)
	r.Handle("/graphiql", playground.Handler("GraphQL playground", "/graphql"))
	r.Handle("/graphql", srv)
	log.Fatal(http.ListenAndServe(":"+graphqlPort, r))
}

func authTokenMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authToken := r.Header.Get("Authorization")

			if authToken == "" {
				next.ServeHTTP(w, r)
				return
			}

			claims, err := utils.ParseAuthToken(authToken)
			if err != nil {
				http.Error(w, `{"errors":{"message":"INVALID_AUTH_TOKEN"}}`, http.StatusForbidden)
				return
			}

			ctx := utils.ContextWithAuthClaims(r.Context(), claims)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

func refreshTokenMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// get refresh token
			token, err := utils.GetRefreshToken(r)
			if err != nil {
				next.ServeHTTP(w, r)
				return
			}

			ctx := utils.ContextWithRefreshToken(r.Context(), token)
			r = r.WithContext(ctx)

			next.ServeHTTP(w, r)
		})
	}
}

func cookieWriterMiddleWare() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			cw := utils.NewCookieWriter(&w)
			// put cookie writer into context
			ctx := utils.ContextWithCookieWriter(r.Context(), cw)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

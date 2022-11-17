package config

import (
	"fmt"
	"log"
	"sync"

	"github.com/spf13/viper"
)

type Config struct {
	database *database
}

var config *Config

func Database() *database {
	return config.database
}

func (c *Config) String() string {
	return fmt.Sprintf("[Database]: %v\n", c.database)
}

var ConfigMap *viper.Viper
var instance sync.Once

func LoadConfig() error {
	instance.Do(func() {
		v := viper.New()
		v.SetConfigName("app")
		v.AddConfigPath("./")
		v.SetConfigType("env")
		if err := v.ReadInConfig(); err != nil {
			fmt.Printf("Failed read file config : %s", err.Error())
		}
		ConfigMap = v
	})

	database := database{
		host:     ConfigMap.GetString("DB_HOST"),
		port:     ConfigMap.GetInt("DB_PORT"),
		username: ConfigMap.GetString("DB_USERNAME"),
		password: ConfigMap.GetString("DB_PASSWORD"),
		dbName:   ConfigMap.GetString("DB_NAME"),
	}

	config = &Config{
		database: &database,
	}

	log.Printf("loading configuration: %s\n", config.String())
	return nil
}

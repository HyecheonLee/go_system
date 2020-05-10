package procon_mysql

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"go_systems/src/procon_config"
	"go_systems/src/procon_utils"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/websocket"
)

var DBCon *sql.DB

func init() {
	var err error
	DBCon, err = sql.Open("mysql", "root:"+procon_config.MysqlPass+"@tcp(mysqldb:3306)/")
	err = DBCon.Ping()
	if err != nil {
		fmt.Println(err)
	}
	DBCon.SetMaxOpenConns(20)
}

type GetMysqlDbsTask struct {
	ws *websocket.Conn
}

func NewGetMysqlDbsTask(ws *websocket.Conn) *GetMysqlDbsTask {
	return &GetMysqlDbsTask{ws}
}

func (rmdst *GetMysqlDbsTask) Perform() {
	var dbnames []string
	rows, err := DBCon.Query("SHOW DATABASES;")
	if err != nil {
		fmt.Println(err)
	} else {
		var dbs string
		for rows.Next() {
			rows.Scan(&dbs)
			dbnames = append(dbnames, dbs)
			fmt.Println(dbs)
		}
	}
	jdbnames, _ := json.Marshal(dbnames)
	fmt.Println(string(jdbnames))

	procon_utils.SendMsg("vAr", "mysql-dbs-list", string(jdbnames), rmdst.ws)
}

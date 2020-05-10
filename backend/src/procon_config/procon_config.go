package procon_config

import (
	"crypto/rsa"
)

var (
	PrivKeyFile *rsa.PrivateKey
	PubKeyFile  *rsa.PublicKey
)

//these can also be set...
const (
	PKPWD = "system"

	KeyCertPath = "C:\\Users\\hyecheon\\IdeaProjects\\go_systems\\key_cert\\"
	PrivKeyPath = KeyCertPath + "mykey.pem"
	PubKeyPath  = KeyCertPath + "mykey.pub"

	//dont forget to escape characters like @ w/ %40

	MongoHost     = "mongodb:27017"
	MongoUser     = "mongodb"
	MongoPassword = "mongodb"
	MongoDb       = "api"
	RedisRP       = ""
	MysqlPass     = "root"
)

func init() {
	/*	f, ok, err := procon_fs.ReadFile(PubKeyPath)
		if !ok || err != nil {
			fmt.Println(err)
		} else {
			PubKeyFile, err = jwtgo.ParseRSAPublicKeyFromPEM(f)
			fmt.Println(PubKeyFile)
			if err != nil {
				fmt.Println(err)
			}
		}*/
	/*f, ok, err := procon_fs.ReadFile(PrivKeyPath)
	if !ok || err != nil {
		fmt.Println(err)
	} else {
		PrivKeyFile, err = jwtgo.ParseRSAPrivateKeyFromPEMWithPassword(f, PKPWD)
		if err != nil {
			fmt.Println(err)
		}
	}*/
}

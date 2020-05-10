package procon_jwt

import (
	"crypto/rsa"
	jwtgo "github.com/dgrijalva/jwt-go"
	"time"
)

func GenerateJWT(privkeyfile *rsa.PrivateKey) (string, error) {
	token := jwtgo.New(jwtgo.SigningMethodHS256)
	in10m := time.Now().Add(time.Duration(30) * time.Minute).Unix()
	token.Claims = jwtgo.MapClaims{
		"iss":    "hclee.com",       // who creates the token and signs it
		"aud":    "localhost",       // to whom the token is intended to be sent
		"exp":    in10m,             // time when the token will expire (10 minutes from now)
		"jti":    "Unique",          // a unique identifier for the token
		"iat":    time.Now().Unix(), // when the token was issued/created (now)
		"nbf":    2,                 // time before which the token is not yet valid (2 minutes ago)
		"sub":    "subject",         // the subject/principal is whom the token is about
		"scopes": "api:read",        // token scope - not a standard claim
	}
	tokenString, err := token.SignedString([]byte("test"))
	if err != nil {
		return "", err
	} else {
		return tokenString, nil
	}
}
func ValidateJWT(publicKeyfile *rsa.PublicKey, jwt string) (bool, error) {
	token, err := jwtgo.Parse(jwt, func(token *jwtgo.Token) (interface{}, error) {
		return []byte("test"), nil
	})
	if err != nil {
		return false, err
	} else if token.Valid {
		return true, nil
	}
	return false, err
}

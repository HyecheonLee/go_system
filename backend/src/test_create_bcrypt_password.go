package main

import (
	"fmt"
	"go_systems/src/procon_utils"
)

func main() {
	password := procon_utils.GenerateUserPassword("system")
	fmt.Println(password)
}

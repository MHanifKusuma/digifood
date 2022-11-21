mockery:
	~/go/bin/mockery --dir=./repository/ --name=AuthRepository --output=./mocks
	~/go/bin/mockery --dir=./repository/ --name=CategoryRepository --output=./mocks
	~/go/bin/mockery --dir=./service/ --name=AuthService --output=./mocks
	~/go/bin/mockery --dir=./service/ --name=CategoryService --output=./mocks

test:
	go test -race -coverprofile=coverage.out $(shell go list ./... | grep -v /mocks/ | grep -v /asset/ | grep -v /dist/ | grep -v /domain/ | grep -v /util/)
	go tool cover -func=coverage.out
	rm coverage.out

lint:
	golangci-lint run ./...

run:
	go run main.go
create-entity:
	near call dev-1621270038265-6253361 addEntity '{"url":"https://twitter.com/SecretsOfCrypto"}' --accountId thanhlm.testnet
create-review:
	near call dev-1621270038265-6253361 addReview '{"url":"https://twitter.com/SecretsOfCrypto", "detail": "He always make profit based on his influence, make the market up and down"}' --accountId thanhlm.testnet
import { DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export class DynamoStoreDataStorage {
    constructor(tableName, options = {region: 'us-east-1'}) {
        this.tableName = tableName;
        this.client = new DynamoDBClient(options);
    }

    async saveStore(data) {
        const params = {
            TableName: this.tableName,
            Item: marshall(data),
        };

        const command = new PutItemCommand(params);

        return await this.client.send(command);
    }

    async loadStore(store_id) {
        const params = {
            TableName: this.tableName,
            Key: marshall({store_id: store_id})
        };

        const command = new GetItemCommand(params);
        const response = await this.client.send(command);
        return unmarshall(response.Item);
    }

    async deleteStore(store_id) {
        const params = {
            TableName: this.tableName,
            Key: marshall({store_id: store_id})
        };

        const command = new DeleteItemCommand(params);
        return await this.client.send(command);
    }

    async listStores() {
        const params = {
            TableName: this.tableName,
        };

        const command = new ScanCommand(params);
        const response = await this.client.send(command);
        return response.Items.map(item => unmarshall(item));
    }
}

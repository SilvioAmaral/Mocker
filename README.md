# Mocker

## Node.js HTTP Server with Request Forwarding and File Saving

The idea behind this project is to act as a mock server to allow UI developers to work separately from the backend, even when servers are down. It will mimic 

This is a simple Node.js HTTP server that can serve local files, forward requests to another server, and save the response to files in multi-level directories. It's configured via a `config.json` file, and you can enable/disable forwarding and specify server details as needed.

## Features

- **Serving Local Files**: The server can serve local text files from a specified directory. The URL and HTTP method determine the file to serve.

- **Request Forwarding**: When forwarding is enabled in the `config.json` file, the server can forward incoming requests to another server specified by the configuration. The response from the other server is then piped back to the original client.

- **File Saving**: When forwarding is enabled, the server can also save the response to files based on the request URL and method. It creates multi-level directories if they don't exist and saves the response data to files.

## Configuration

The server's behavior is controlled through the `config.json` file:

```json
{
  "folderPath": "/path/to/local/files",
  "forward": {
    "enabled": true,
    "hostname": "example.com",
    "port": 80,
    "saveResponseToFile": true
  }
}
```

- `folderPath`: Specify the path to the directory where local text files are stored.

- `forward`: Contains forwarding-related settings:
  - `enabled`: Set to `true` to enable request forwarding.
  - `hostname`: The hostname of the server to which requests will be forwarded.
  - `port`: The port of the server to which requests will be forwarded.
  - `saveResponseToFile`: Set to `true` to save the response to files.

## Usage

1. Modify the `config.json` file to suit your needs by specifying the local folder path and the forwarding settings.

2. Start the server by running the Node.js script. By default, it listens on port 3000. You can change the port in the code if needed.

3. Access the server by making HTTP requests, and it will handle serving local files, forwarding requests, and saving responses based on your configuration.

## Getting Started

To get started, follow these steps:

1. Clone this repository or create a Node.js project.

2. Create a `config.json` file with your desired configuration.

3. Add local text files to the directory specified in the `config.json` file.

4. Install any required Node.js dependencies if necessary.

5. Run the Node.js script to start the server.

6. Access the server, make requests, and observe its behavior based on your configuration.

## TODO

- Cover with Unit tests
- Add custom js code to handle specific requests
- Add way to perform authentication with proxy servers


## License

This project is licensed under the [MIT License](LICENSE).

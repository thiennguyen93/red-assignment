<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Project Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository by Thien Nguyen.

## Backend Setup 

To get started, clone this repository and navigate to the root folder:

```bash
$ git clone https://github.com/thiennguyen93/red-assignment.git
$ cd red-assignment
```

To set up the backend, ensure you have Docker Compose installed. Then, run the following command:

```bash
$ docker compose up --force-recreate
```

> **Note:** The `--force-recreate` flag is optional and should only be used if you want to create a fresh version of the containers.

This will automatically set up everything, including MySQL, MinIO, and the NestJS application. The services will run on the following ports:

- MySQL: `3306`
- MinIO: `9000` (console: `9001`)
- NestJS: `3000`

Make sure these ports are available before proceeding with the setup.

### MinIO Local Domain Setup

To access MinIO using a local domain, follow the steps below for your operating system:

#### macOS

1. Open the `/etc/hosts` file in the Nano text editor with elevated privileges:
  ```bash
  sudo nano /etc/hosts
  ```
  Enter your password if prompted.

2. Use the arrow keys to navigate to the end of the file and add the following line:
  ```
  127.0.0.1 minio
  ```

3. Press `Ctrl + O` to save the file, then press `Enter` to confirm.

4. Press `Ctrl + X` to exit the editor.

5. Flush the DNS cache to apply the changes:
  ```bash
  sudo dscacheutil -flushcache
  ```

#### Windows

1. Open Notepad as an administrator:
  - Press the `Windows` key, type `Notepad`, right-click on it, and select **Run as administrator**.

2. Open the `hosts` file located at:
  ```
  C:\Windows\System32\drivers\etc\hosts
  ```

3. Add the following line to the file:
  ```
  127.0.0.1 minio
  ```

4. Save the file and close Notepad.

5. Flush the DNS cache by running the following command in Command Prompt (as administrator):
  ```cmd
  ipconfig /flushdns
  ```

After completing these steps, you can access MinIO using `http://minio:9000` and the console at `http://minio:9001`.

## Health Check

To verify the health of the application, open your browser and navigate to:

```
http://localhost:3000/api
```

If everything is set up correctly, you should see the Swagger documentation for the API.

## Frontend Setup

After setting up the API, proceed to set up the frontend by checking out the frontend repository. Follow the instructions in its `README.md` file for the setup process.

The frontend repository can be found at:

```bash
https://github.com/thiennguyen93/red-assignement-fe
```

Ensure the backend API is running before starting the frontend application.

## Trouble-Shooting

In case you failed at any step when setting up the backend API, try running the following command to take down the container and remove associated volumes:

```bash
$ docker compose down -v
```

Then, attempt the setup process again. If you still encounter issues, feel free to contact me at [hi@thiennguyen.dev](mailto:hi@thiennguyen.dev).
# Art Workflow

Automatic ZIP animation watcher and spritesheet generator built with Bun.

The application watches a folder for incoming `.zip` files, extracts PNG frames, generates spritesheets, and exports processed images automatically.

---

# Features

* Folder watcher
* Automatic ZIP extraction
* PNG spritesheet generation
* Image resizing
* CSV processing history
* Cross-platform paths
* Standalone executable build
* Linux/macOS/Windows support

---

# Requirements

## Runtime

Install [Bun](https://bun.sh?utm_source=chatgpt.com)

Verify installation:

```bash id="2g9h4r"
bun --version
```

---

# Install Dependencies

```bash id="rf7v7n"
bun install
```

---

# Development

Run locally:

```bash id="2mjlwm"
bun run src/main.ts
```

---

# Standalone Build

Generate a standalone executable:

```bash id="98mjlwm"
bun build ./src/main.ts \
  --compile \
  --outfile ./release/art-workflow
```

The generated binary runs without requiring Node.js or Bun installed on the target machine.

---

# Configuration

Create a `config.json` file next to the executable.

Example:

```json id="xjlwmq"
{
  "watchFolder": "~/Downloads/animations",

  "outputFolder": "~/GameAssets/sprites",

  "csvPath": "~/art-workflow/processed.csv",

  "sprite": {
    "columns": 4,
    "scale": 0.5,
    "gap": 0
  }
}
```

---

# Running the Executable

Linux/macOS:

```bash id="jlwmv4"
chmod +x art-workflow

./art-workflow
```

Windows:

```text id="qj0y9p"
Double-click the executable.
```

---

# Running as a systemd User Service (Linux)

Create a user service directory:

```bash id="jlwm9n"
mkdir -p ~/.config/systemd/user
```

---

# Create the Service File

Create:

```text id="q8jlwm"
~/.config/systemd/user/art-workflow.service
```

Example:

```ini id="jlwmk2"
[Unit]
Description=Art Workflow

[Service]
ExecStart=/path/to/art-workflow
WorkingDirectory=/path/to/release
Restart=always

[Install]
WantedBy=default.target
```

---

# Finding the Correct Paths

## Get the executable absolute path

Run:

```bash id="jlwmf8"
realpath ./art-workflow
```

---

## Get the current folder absolute path

Run:

```bash id="jlwmw5"
pwd
```

Use these values in:

* `ExecStart`
* `WorkingDirectory`

---

# Enable the Service

Reload systemd:

```bash id="jlwmn6"
systemctl --user daemon-reload
```

Enable startup on login:

```bash id="jlwm1q"
systemctl --user enable art-workflow
```

Start the service:

```bash id="jlwm0z"
systemctl --user start art-workflow
```

---

# Service Status

Check status:

```bash id="jlwm3r"
systemctl --user status art-workflow
```

---

# Monitoring Logs with journalctl

Follow logs in realtime:

```bash id="j8mjlwm"
journalctl --user -u art-workflow -f
```

---

# Show Recent Logs

```bash id="9jlwmx"
journalctl --user -u art-workflow --since "1 hour ago"
```

---

# Restart the Service

```bash id="5jlwm0"
systemctl --user restart art-workflow
```

---

# Stop the Service

```bash id="jlwmc3"
systemctl --user stop art-workflow
```

---

# Disable Automatic Startup

```bash id="jlwm7x"
systemctl --user disable art-workflow
```

---

# Recommended Folder Structure

```text id="jlwm2s"
release/
├── art-workflow
├── config.json
└── processed.csv
```

---

# Future Plans

* Tauri tray application
* Animation previews
* Godot importer
* Texture atlas metadata
* Queue system
* Multiple watched folders
* Auto-update support
* Background daemon improvements

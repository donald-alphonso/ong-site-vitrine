import fs from 'fs';
import path from 'path';
import os from 'os';

// Définition des niveaux de log
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

// Configuration du logger
interface LoggerConfig {
  logDirectory: string;
  logToConsole: boolean;
  logToFile: boolean;
  maxLogFiles: number;
  maxFileSizeInBytes: number;
}

class Logger {
  private static instance: Logger;
  private config: LoggerConfig;
  private currentLogFile!: string;
  private currentFileSize!: number;
  private context: Record<string, any> = {};

  private constructor() {
    // Déterminer le chemin du dossier logs de manière cross-platform
    const serverDir = this.getServerDirectory();

    this.config = {
      logDirectory: path.join(serverDir, 'logs'),
      logToConsole: process.env.NODE_ENV !== 'production',
      logToFile: true,
      maxLogFiles: Number(process.env.MAX_LOG_FILES) || 5,
      maxFileSizeInBytes:
        Number(process.env.MAX_LOG_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    };
    this.initializeLogger();
  }

  private getServerDirectory(): string {
    // Essayer plusieurs stratégies pour trouver le dossier server
    const strategies = [
      // 1. Depuis le fichier actuel
      () => path.resolve(__dirname, '../../'),
      // 2. Depuis la racine du projet
      () => {
        const projectRoot = process.cwd();
        return path.join(projectRoot, 'server');
      },
      // 3. Depuis la variable d'environnement
      () => process.env.SERVER_DIR || '',
      // 4. Fallback au dossier temp du système
      () => path.join(os.tmpdir(), 'server-logs'),
    ];

    for (const strategy of strategies) {
      try {
        const dir = strategy();
        if (dir && fs.existsSync(dir)) {
          return dir;
        }
      } catch (error) {
        continue;
      }
    }

    // Si aucune stratégie ne fonctionne, utiliser le dossier temp
    return path.join(os.tmpdir(), 'server-logs');
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private initializeLogger(): void {
    if (!fs.existsSync(this.config.logDirectory)) {
      fs.mkdirSync(this.config.logDirectory, { recursive: true });
    }
    this.rotateLogFiles();
    this.currentLogFile = path.join(
      this.config.logDirectory,
      `app-${this.getTimestamp()}.log`
    );
    this.currentFileSize = 0;
  }

  private getTimestamp(): string {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, '-');
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    additionalContext?: any
  ): string {
    const timestamp = new Date().toISOString();
    const context = {
      ...this.context,
      ...additionalContext,
    };

    return (
      JSON.stringify({
        timestamp,
        level,
        message,
        ...context,
      }) + '\n'
    );
  }

  private async writeToFile(message: string): Promise<void> {
    if (!this.config.logToFile) return;

    try {
      // Vérifier la taille du fichier actuel
      if (this.currentFileSize >= this.config.maxFileSizeInBytes) {
        await this.rotateLogFiles();
        this.currentLogFile = path.join(
          this.config.logDirectory,
          `app-${this.getTimestamp()}.log`
        );
        this.currentFileSize = 0;
      }

      // Écrire le message
      await fs.promises.appendFile(this.currentLogFile, message);
      this.currentFileSize += Buffer.byteLength(message);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  private async rotateLogFiles(): Promise<void> {
    try {
      const files = await fs.promises.readdir(this.config.logDirectory);
      const logFiles = files
        .filter((file) => file.endsWith('.log'))
        .map((file) => ({
          name: file,
          path: path.join(this.config.logDirectory, file),
          time: fs
            .statSync(path.join(this.config.logDirectory, file))
            .mtime.getTime(),
        }))
        .sort((a, b) => b.time - a.time);

      // Supprimer les fichiers les plus anciens si nous dépassons maxLogFiles
      while (logFiles.length >= this.config.maxLogFiles) {
        const oldestFile = logFiles.pop();
        if (oldestFile) {
          await fs.promises.unlink(oldestFile.path);
        }
      }
    } catch (error) {
      console.error('Error rotating log files:', error);
    }
  }

  public setContext(context: Record<string, any>) {
    this.context = context;
  }

  public debugs(message: string, context?: any): void {
    const formattedMessage = this.formatMessage(
      LogLevel.DEBUG,
      message,
      context
    );
    if (this.config.logToConsole) {
      console.debug(formattedMessage);
    }
    this.writeToFile(formattedMessage);
  }

  public info(message: string, context?: any): void {
    const formattedMessage = this.formatMessage(
      LogLevel.INFO,
      message,
      context
    );
    if (this.config.logToConsole) {
      console.info(formattedMessage);
    }
    this.writeToFile(formattedMessage);
  }

  public warn(message: string, context?: any): void {
    const formattedMessage = this.formatMessage(
      LogLevel.WARN,
      message,
      context
    );
    if (this.config.logToConsole) {
      console.warn(formattedMessage);
    }
    this.writeToFile(formattedMessage);
  }

  public error(message: string, error?: unknown, context?: any): void {
    const errorContext = error
      ? {
          ...context,
          errorMessage: error,
        }
      : context;

    const formattedMessage = this.formatMessage(
      LogLevel.ERROR,
      message,
      errorContext
    );
    if (this.config.logToConsole) {
      console.error(formattedMessage);
    }
    this.writeToFile(formattedMessage);
  }

  public setConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
    this.initializeLogger();
  }
}

export const logger = Logger.getInstance();

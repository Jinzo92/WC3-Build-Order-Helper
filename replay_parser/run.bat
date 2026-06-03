@echo off
set /p replayPath="Geben Sie den Pfad zum Replay ein (oder ziehen Sie die Datei hierher): "
echo Installiere Abhaengigkeiten...
call npm install
echo Verarbeite Replay...
node parser.js %replayPath%
pause

@echo off
echo 📦 Installing AI Code Reviewer...

:: 1. กำหนดตำแหน่ง Hook
set HOOK_DIR=..\.git\hooks
set HOOK_FILE=%HOOK_DIR%\pre-commit

:: 2. ตรวจสอบว่ามีโฟลเดอร์ .git ไหม
if not exist "%HOOK_DIR%" (
    echo ❌ Error: .git folder not found! Are you in the right directory?
    pause
    exit /b
)

:: 3. เขียนคำสั่งลงไฟล์ pre-commit
echo #!/bin/sh > "%HOOK_FILE%"
echo "./ai-tools/AiPitching_ReviewCode.exe" >> "%HOOK_FILE%"

:: 4. จบงาน
echo ✅ Hook installed! AI will now review your commits.
pause
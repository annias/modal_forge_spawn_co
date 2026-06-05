# ==========================================================================
# Modal Forge — GitHub Pages Deployment Helper
# ==========================================================================
# This script configures the remote origin for your repository and pushes
# the committed files. It then guides you through activating GitHub Pages.

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "     Modal Forge GitHub Deployment        " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# 1. Ask for repo URL
$repoUrl = Read-Host "Please enter your empty GitHub Repository URL (e.g. https://github.com/your-username/modal-forge.git)"
$repoUrl = $repoUrl.Trim()

if ([string]::IsNullOrEmpty($repoUrl)) {
    Write-Host "[ERROR] Repository URL cannot be empty. Deployment aborted." -ForegroundColor Red
    Exit
}

# Check if remote already exists, if so remove it
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "Removing existing remote origin..."
    git remote remove origin
}

# 2. Add remote
Write-Host "Adding remote origin..."
git remote add origin $repoUrl

# 3. Push to main
Write-Host "Pushing code to main branch on GitHub..." -ForegroundColor Cyan
Write-Host "Your credentials manager will handle authentication if prompted." -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "      🎉 Code Pushed Successfully!        " -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Follow these steps to activate your github.io page:" -ForegroundColor Yellow
    Write-Host "1. Open your browser and go to your repository page on GitHub."
    Write-Host "2. Click on 'Settings' (the gear icon on the top tab)."
    Write-Host "3. In the left navigation sidebar, click on 'Pages'."
    Write-Host "4. Under 'Build and deployment' -> 'Branch', select 'main' (or root) and click 'Save'."
    Write-Host "5. Wait 1-2 minutes. Your website will be live at:"
    
    # Try to extract username and repo name to construct the URL
    if ($repoUrl -match "github\.com[:/]([^/]+)/([^.]+)") {
        $username = $Matches[1]
        $repoName = $Matches[2]
        Write-Host "   👉 https://$username.github.io/$repoName/" -ForegroundColor Green
    } else {
        Write-Host "   👉 https://[your-username].github.io/[your-repo-name]/" -ForegroundColor Green
    }
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "[ERROR] Git push failed. Please check your network connection, verify that the repository exists on GitHub, and try again." -ForegroundColor Red
    Write-Host "You can manually push using: git push -u origin main" -ForegroundColor Yellow
    Write-Host ""
}

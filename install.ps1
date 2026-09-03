<#
.SYNOPSIS
  Install the blog-writing Agent Skills into an AI agent (Windows / PowerShell).

.DESCRIPTION
  Thin wrapper around scripts/install-skills.mjs. Checks that Node.js is
  available, then forwards all arguments to the installer.

.EXAMPLE
  .\install.ps1 -List
.EXAMPLE
  .\install.ps1 -Agent claude -Scope global
.EXAMPLE
  .\install.ps1 -Agent kiro -Target ..\my-blog-repo
.EXAMPLE
  .\install.ps1 -Agent all -Scope global -Force
#>
[CmdletBinding()]
param(
  [ValidateSet('kiro', 'claude', 'antigravity', 'hermes', 'codex', 'all')]
  [string]$Agent,

  [ValidateSet('project', 'global')]
  [string]$Scope = 'project',

  [string]$Target,

  [switch]$DryRun,
  [switch]$Force,
  [switch]$List
)

$ErrorActionPreference = 'Stop'

# Ensure Node.js is installed.
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Error "Node.js is required but was not found on PATH. Install it from https://nodejs.org and try again."
  exit 1
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$installer = Join-Path $scriptDir 'scripts/install-skills.mjs'
if (-not (Test-Path $installer)) {
  Write-Error "Cannot find installer at $installer. Run this script from the repo root."
  exit 1
}

# Build argument list for the Node installer.
$argsList = @()
if ($List) {
  $argsList += '--list'
}
else {
  if (-not $Agent) {
    Write-Error "Specify -Agent <kiro|claude|antigravity|hermes|codex|all> or use -List."
    exit 1
  }
  $argsList += @('--agent', $Agent, '--scope', $Scope)
  if ($Target) { $argsList += @('--target', $Target) }
  if ($DryRun) { $argsList += '--dry-run' }
  if ($Force) { $argsList += '--force' }
}

& node $installer @argsList
exit $LASTEXITCODE

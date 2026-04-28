#!/usr/bin/env node

/**
 * Pre-Flight Documentation Validation
 * Comprehensive validation before documentation deployment
 * Checks all aspects of documentation quality
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PreFlightValidator {
  constructor() {
    this.report = {
      timestamp: new Date().toISOString(),
      status: 'pending',
      checks: {},
      summary: '',
      errors: [],
      warnings: [],
    };
  }

  runCheck(name, description, command) {
    console.log(`\n🔄 ${description}`);
    this.report.checks[name] = {
      status: 'pending',
      description,
      timestamp: new Date().toISOString(),
    };

    try {
      execSync(command, { stdio: 'pipe', cwd: process.cwd() });
      this.report.checks[name].status = 'pass';
      console.log(`✅ ${name}: Passed`);
      return true;
    } catch (error) {
      this.report.checks[name].status = 'fail';
      this.report.checks[name].error = error.message;
      console.log(`❌ ${name}: Failed`);
      console.log(`   Error: ${error.message.split('\n')[0]}`);
      this.report.errors.push({ check: name, error: error.message });
      return false;
    }
  }

  validateFileStructure() {
    console.log('\n📁 Validating File Structure');

    const requiredDirs = [
      'docs-site/src/content/docs',
      'docs-site/src/content/docs/ace',
      'docs-site/src/content/docs/skill',
      'docs-site/src/content/docs/peraltacc',
      '.github/workflows',
      '.github/scripts',
    ];

    const missingDirs = requiredDirs.filter((dir) => !fs.existsSync(dir));

    if (missingDirs.length > 0) {
      this.report.warnings.push({
        check: 'file-structure',
        message: `Missing directories: ${missingDirs.join(', ')}`,
      });
      console.log(`⚠️  Missing directories: ${missingDirs.join(', ')}`);
    } else {
      console.log('✅ File structure is valid');
    }

    return missingDirs.length === 0;
  }

  validateMarkdownFiles() {
    console.log('\n📄 Validating Markdown Files');

    const glob = require('glob');
    const markdownFiles = glob.sync('**/*.{md,mdx}', {
      ignore: ['node_modules/**', '.git/**', 'dist/**'],
    });

    console.log(`Found ${markdownFiles.length} markdown files`);

    let validFiles = 0;
    const issues = [];

    markdownFiles.forEach((file) => {
      try {
        const content = fs.readFileSync(file, 'utf8');

        // Check for frontmatter
        if (!content.startsWith('---')) {
          issues.push({ file, issue: 'Missing frontmatter' });
        } else {
          validFiles++;
        }
      } catch (error) {
        issues.push({ file, issue: error.message });
      }
    });

    console.log(`✅ ${validFiles}/${markdownFiles.length} files have proper frontmatter`);

    if (issues.length > 0) {
      this.report.warnings.push({
        check: 'markdown-files',
        issues,
      });
    }

    return issues.length === 0;
  }

  validateConfiguration() {
    console.log('\n⚙️  Validating Configuration Files');

    const configFiles = [
      '.markdownlintrc.json',
      '.prettierrc.json',
      '.github/markdown-link-check-config.json',
    ];

    const missingConfigs = configFiles.filter((file) => !fs.existsSync(file));

    if (missingConfigs.length > 0) {
      console.log(`⚠️  Missing config files: ${missingConfigs.join(', ')}`);
      this.report.warnings.push({
        check: 'configuration',
        message: `Missing config files: ${missingConfigs.join(', ')}`,
      });
    } else {
      console.log('✅ All configuration files present');

      // Validate JSON configs
      configFiles.forEach((file) => {
        try {
          const content = fs.readFileSync(file, 'utf8');
          JSON.parse(content);
          console.log(`✅ ${file} is valid JSON`);
        } catch (error) {
          console.log(`❌ ${file} has invalid JSON`);
          this.report.errors.push({
            check: 'configuration',
            file,
            error: error.message,
          });
        }
      });
    }

    return missingConfigs.length === 0;
  }

  validateWorkflows() {
    console.log('\n🔄 Validating GitHub Workflows');

    const workflowFiles = glob.sync('.github/workflows/*.yml');

    if (workflowFiles.length === 0) {
      console.log('⚠️  No workflow files found');
      this.report.warnings.push({
        check: 'workflows',
        message: 'No workflow files found',
      });
      return false;
    }

    console.log(`Found ${workflowFiles.length} workflow files`);

    workflowFiles.forEach((file) => {
      try {
        const content = fs.readFileSync(file, 'utf8');

        // Basic YAML validation
        if (content.includes('on:') && content.includes('jobs:')) {
          console.log(`✅ ${file} looks valid`);
        } else {
          console.log(`⚠️  ${file} might be invalid`);
          this.report.warnings.push({
            check: 'workflows',
            message: `${file} might have issues`,
          });
        }
      } catch (error) {
        console.log(`❌ Error reading ${file}: ${error.message}`);
        this.report.errors.push({
          check: 'workflows',
          file,
          error: error.message,
        });
      }
    });

    return true;
  }

  generateReport() {
    console.log('\n' + '='.repeat(70));
    console.log('\n📊 PRE-FLIGHT VALIDATION REPORT\n');

    // Count results
    const passed = Object.values(this.report.checks).filter((c) => c.status === 'pass')
      .length;
    const failed = Object.values(this.report.checks).filter((c) => c.status === 'fail')
      .length;
    const pending = Object.values(this.report.checks).filter((c) => c.status === 'pending')
      .length;

    console.log(`Checks Passed: ${passed}`);
    console.log(`Checks Failed: ${failed}`);
    console.log(`Checks Pending: ${pending}`);
    console.log(`Errors: ${this.report.errors.length}`);
    console.log(`Warnings: ${this.report.warnings.length}`);

    // Determine overall status
    if (failed > 0) {
      this.report.status = 'fail';
      console.log('\n❌ PRE-FLIGHT CHECK: FAILED');
    } else if (pending > 0 || this.report.errors.length > 0) {
      this.report.status = 'warning';
      console.log('\n⚠️  PRE-FLIGHT CHECK: WARNING');
    } else {
      this.report.status = 'pass';
      console.log('\n✅ PRE-FLIGHT CHECK: PASSED');
    }

    // Generate summary
    this.report.summary = `
Pre-Flight Documentation Validation Report
Generated: ${new Date().toISOString()}

Status: ${this.report.status.toUpperCase()}
Passed: ${passed} | Failed: ${failed} | Pending: ${pending}
Errors: ${this.report.errors.length} | Warnings: ${this.report.warnings.length}

This report indicates the documentation is ${
      this.report.status === 'pass' ? 'ready' : 'NOT ready'
    } for deployment.
`.trim();

    console.log('\n' + this.report.summary);

    // Save report
    fs.writeFileSync(
      'markdown-validation-report.json',
      JSON.stringify(this.report, null, 2)
    );
    console.log('\n📄 Report saved to: markdown-validation-report.json');
  }

  run() {
    console.log('🚀 Starting Pre-Flight Documentation Validation\n');
    console.log('='.repeat(70));

    // Run all checks
    this.validateFileStructure();
    this.validateMarkdownFiles();
    this.validateConfiguration();
    this.validateWorkflows();

    // Generate and display report
    this.generateReport();

    // Exit with appropriate code
    const hasErrors = this.report.status === 'fail' || this.report.errors.length > 0;
    process.exit(hasErrors ? 1 : 0);
  }
}

// Run validator
const validator = new PreFlightValidator();
validator.run();

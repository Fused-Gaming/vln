/**
 * Audit API Tests
 * Unit tests for audit endpoints
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Test audit intake schema validation
describe('Audit Intake Schema', () => {
  const auditIntakeSchema = z.object({
    projectName: z
      .string()
      .min(3, 'Project name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    serviceType: z.enum([
      'SMART_CONTRACT_AUDIT',
      'PLATFORM_SECURITY_AUDIT',
      'RNG_ANALYSIS',
      'WALLET_FLOW_RISK_ASSESSMENT',
      'API_SECURITY_REVIEW',
      'CUSTOM_ASSESSMENT',
    ]),
    scope: z.object({
      contracts: z.array(z.string()).optional(),
      lines_of_code: z.number().optional(),
      description: z.string().optional(),
    }),
    priority: z
      .enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
      .default('MEDIUM')
      .optional(),
  });

  it('should accept valid audit request', () => {
    const validData = {
      projectName: 'MyDeFiProtocol',
      description: 'Security audit for our smart contract ecosystem',
      serviceType: 'SMART_CONTRACT_AUDIT',
      scope: {
        lines_of_code: 5000,
        description: 'Main contracts',
      },
      priority: 'HIGH',
    };

    const result = auditIntakeSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject short project name', () => {
    const invalidData = {
      projectName: 'AB',
      description: 'Security audit for our smart contract ecosystem',
      serviceType: 'SMART_CONTRACT_AUDIT',
      scope: {},
    };

    const result = auditIntakeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject short description', () => {
    const invalidData = {
      projectName: 'MyProject',
      description: 'Short',
      serviceType: 'SMART_CONTRACT_AUDIT',
      scope: {},
    };

    const result = auditIntakeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject invalid service type', () => {
    const invalidData = {
      projectName: 'MyProject',
      description: 'Security audit for our smart contract ecosystem',
      serviceType: 'INVALID_TYPE',
      scope: {},
    };

    const result = auditIntakeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept default priority', () => {
    const validData = {
      projectName: 'MyProject',
      description: 'Security audit for our smart contract ecosystem',
      serviceType: 'SMART_CONTRACT_AUDIT',
      scope: {},
    };

    const result = auditIntakeSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.priority).toBe('MEDIUM');
    }
  });

  it('should accept all service types', () => {
    const serviceTypes = [
      'SMART_CONTRACT_AUDIT',
      'PLATFORM_SECURITY_AUDIT',
      'RNG_ANALYSIS',
      'WALLET_FLOW_RISK_ASSESSMENT',
      'API_SECURITY_REVIEW',
      'CUSTOM_ASSESSMENT',
    ];

    serviceTypes.forEach((serviceType) => {
      const data = {
        projectName: 'MyProject',
        description: 'Security audit for our smart contract ecosystem',
        serviceType,
        scope: {},
      };

      const result = auditIntakeSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});

// Test cost estimation
describe('Audit Cost Estimation', () => {
  const baseRates: Record<string, number> = {
    SMART_CONTRACT_AUDIT: 5000,
    PLATFORM_SECURITY_AUDIT: 7500,
    RNG_ANALYSIS: 3000,
    WALLET_FLOW_RISK_ASSESSMENT: 2500,
    API_SECURITY_REVIEW: 4000,
    CUSTOM_ASSESSMENT: 5000,
  };

  const calculateEstimatedCost = (serviceType: string, linesOfCode: number) => {
    const baseRate = baseRates[serviceType] || 5000;
    const scopeMultiplier = Math.max(1, Math.ceil(linesOfCode / 1000));
    return baseRate * scopeMultiplier;
  };

  it('should calculate base cost for service', () => {
    const cost = calculateEstimatedCost('SMART_CONTRACT_AUDIT', 0);
    expect(cost).toBe(5000);
  });

  it('should multiply cost by scope size', () => {
    const cost = calculateEstimatedCost('SMART_CONTRACT_AUDIT', 5000);
    expect(cost).toBe(25000); // 5000 * 5 multiplier
  });

  it('should handle fractional multiplier', () => {
    const cost = calculateEstimatedCost('SMART_CONTRACT_AUDIT', 1500);
    expect(cost).toBe(10000); // 5000 * 2 (ceil of 1.5)
  });

  it('should use different base rates for different services', () => {
    const smartContractCost = calculateEstimatedCost('SMART_CONTRACT_AUDIT', 0);
    const platformCost = calculateEstimatedCost('PLATFORM_SECURITY_AUDIT', 0);

    expect(smartContractCost).toBe(5000);
    expect(platformCost).toBe(7500);
    expect(platformCost > smartContractCost).toBe(true);
  });

  it('should calculate correctly for large projects', () => {
    const cost = calculateEstimatedCost('SMART_CONTRACT_AUDIT', 50000);
    expect(cost).toBe(250000); // 5000 * 50
  });
});

// Test file upload validation
describe('File Upload Validation', () => {
  const SUPPORTED_EXTENSIONS = [
    '.sol', '.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs',
    '.java', '.cpp', '.c', '.h', '.yul', '.vy', '.asm',
    '.json', '.txt', '.md', '.pdf', '.zip',
  ];

  const validateFileExtension = (fileName: string): boolean => {
    const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
  };

  it('should accept solidity files', () => {
    expect(validateFileExtension('contract.sol')).toBe(true);
  });

  it('should accept javascript/typescript files', () => {
    expect(validateFileExtension('script.js')).toBe(true);
    expect(validateFileExtension('app.ts')).toBe(true);
    expect(validateFileExtension('component.tsx')).toBe(true);
  });

  it('should accept python files', () => {
    expect(validateFileExtension('analysis.py')).toBe(true);
  });

  it('should accept archive files', () => {
    expect(validateFileExtension('project.zip')).toBe(true);
  });

  it('should reject unsupported extensions', () => {
    expect(validateFileExtension('file.exe')).toBe(false);
    expect(validateFileExtension('file.bat')).toBe(false);
    expect(validateFileExtension('file.sh')).toBe(false);
  });

  it('should be case insensitive', () => {
    expect(validateFileExtension('CONTRACT.SOL')).toBe(true);
    expect(validateFileExtension('Script.JS')).toBe(true);
  });

  it('should handle files without extensions', () => {
    expect(validateFileExtension('Dockerfile')).toBe(false);
  });
});

// Test priority levels
describe('Audit Priority Levels', () => {
  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  it('should accept all priority levels', () => {
    priorities.forEach((priority) => {
      const schema = z.enum(priorities as any);
      const result = schema.safeParse(priority);
      expect(result.success).toBe(true);
    });
  });

  it('should reject invalid priority', () => {
    const schema = z.enum(priorities as any);
    const result = schema.safeParse('URGENT');
    expect(result.success).toBe(false);
  });
});

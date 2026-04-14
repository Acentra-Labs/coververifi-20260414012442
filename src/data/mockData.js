// Mock Data for CoverVerifi
// Organized by Supabase table equivalents

const today = new Date();

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Consultants table
export const consultants = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'dawn@coververifi.com',
    fullName: 'Dawn Martinez',
    companyName: 'Compliance First LLC',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

// General Contractors table
export const generalContractors = [
  {
    id: 'gc-001',
    consultantId: '550e8400-e29b-41d4-a716-446655440000',
    companyName: 'Mountain West Builders',
    contactEmail: 'john@mountainwest.com',
    contactPhone: '208-555-0101',
    glRequirement: 1000000,
    wcRequirement: 500000,
    requireAdditionalInsured: true,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'gc-002',
    consultantId: '550e8400-e29b-41d4-a716-446655440000',
    companyName: 'HomeWorks Inc',
    contactEmail: 'sarah@homeworks.com',
    contactPhone: '208-555-0102',
    glRequirement: 1000000,
    wcRequirement: 500000,
    requireAdditionalInsured: false,
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z'
  },
  {
    id: 'gc-003',
    consultantId: '550e8400-e29b-41d4-a716-446655440000',
    companyName: 'Interstate Concrete',
    contactEmail: 'mark@concrete.com',
    contactPhone: '208-555-0103',
    glRequirement: 1000000,
    wcRequirement: 500000,
    requireAdditionalInsured: true,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  }
];

// Subcontractors table (shared)
export const subcontractors = [
  {
    id: 'sub-001',
    companyName: "John's Roofing",
    phone: '208-555-1001',
    email: 'john@johnsroofing.com',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'sub-002',
    companyName: 'ABC Electrical',
    phone: '208-555-1002',
    email: 'info@abcelectric.com',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'sub-003',
    companyName: 'Smith Plumbing & HVAC',
    phone: '208-555-1003',
    email: 'service@smithplumbing.com',
    createdAt: '2024-02-16T10:00:00Z',
    updatedAt: '2024-02-16T10:00:00Z'
  },
  {
    id: 'sub-004',
    companyName: 'Pro Painting Services',
    phone: '208-555-1004',
    email: 'quotes@propainting.com',
    createdAt: '2024-02-16T10:00:00Z',
    updatedAt: '2024-02-16T10:00:00Z'
  },
  {
    id: 'sub-005',
    companyName: 'Foundation Experts LLC',
    phone: '208-555-1005',
    email: 'foundation@experts.com',
    createdAt: '2024-02-17T10:00:00Z',
    updatedAt: '2024-02-17T10:00:00Z'
  },
  {
    id: 'sub-006',
    companyName: 'Precision Framing',
    phone: '208-555-1006',
    email: 'quotes@precisionframing.com',
    createdAt: '2024-02-18T10:00:00Z',
    updatedAt: '2024-02-18T10:00:00Z'
  },
  {
    id: 'sub-007',
    companyName: 'Quality Drywall Inc',
    phone: '208-555-1007',
    email: 'info@qualitydrywall.com',
    createdAt: '2024-02-18T10:00:00Z',
    updatedAt: '2024-02-18T10:00:00Z'
  },
  {
    id: 'sub-008',
    companyName: 'Tile Masters',
    phone: '208-555-1008',
    email: 'estimates@tilemasters.com',
    createdAt: '2024-02-19T10:00:00Z',
    updatedAt: '2024-02-19T10:00:00Z'
  }
];

// GC-Subcontractor junction table (many-to-many)
export const gcSubcontractors = [
  { id: 'gc-sub-001', gcId: 'gc-001', subId: 'sub-001', createdAt: '2024-02-20T10:00:00Z' },
  { id: 'gc-sub-002', gcId: 'gc-001', subId: 'sub-002', createdAt: '2024-02-20T10:00:00Z' },
  { id: 'gc-sub-003', gcId: 'gc-001', subId: 'sub-006', createdAt: '2024-02-21T10:00:00Z' },
  { id: 'gc-sub-004', gcId: 'gc-002', subId: 'sub-002', createdAt: '2024-02-21T10:00:00Z' },
  { id: 'gc-sub-005', gcId: 'gc-002', subId: 'sub-003', createdAt: '2024-02-22T10:00:00Z' },
  { id: 'gc-sub-006', gcId: 'gc-002', subId: 'sub-007', createdAt: '2024-02-22T10:00:00Z' },
  { id: 'gc-sub-007', gcId: 'gc-003', subId: 'sub-004', createdAt: '2024-02-23T10:00:00Z' },
  { id: 'gc-sub-008', gcId: 'gc-003', subId: 'sub-005', createdAt: '2024-02-23T10:00:00Z' },
  { id: 'gc-sub-009', gcId: 'gc-003', subId: 'sub-008', createdAt: '2024-02-24T10:00:00Z' }
];

// Insurance Agents table
export const insuranceAgents = [
  {
    id: 'agent-001',
    agentName: 'Bob Smith',
    agencyName: 'State Farm Local Agency',
    phone: '208-555-2001',
    email: 'bob.smith@statefarm.com',
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'agent-002',
    agentName: 'Jane Doe',
    agencyName: 'Allstate Insurance',
    phone: '208-555-2002',
    email: 'jane.doe@allstate.com',
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'agent-003',
    agentName: 'Mike Johnson',
    agencyName: 'Nationwide Insurance',
    phone: '208-555-2003',
    email: 'mike.johnson@nationwide.com',
    createdAt: '2024-02-02T10:00:00Z'
  },
  {
    id: 'agent-004',
    agentName: 'Linda Chen',
    agencyName: 'Liberty Mutual Agency',
    phone: '208-555-2004',
    email: 'linda.chen@libertymutual.com',
    createdAt: '2024-02-02T10:00:00Z'
  }
];

// Insurance Policies table (Workers Comp & General Liability)
export const insurancePolicies = [
  // John's Roofing - sub-001
  {
    id: 'policy-001',
    subId: 'sub-001',
    policyType: 'workers_comp',
    carrier: 'State Farm',
    policyNumber: 'WC-123456-RH',
    expirationDate: addDays(today, 9), // 9 days - RED
    coverageLimit: 500000,
    agentId: 'agent-001',
    status: 'active',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'policy-002',
    subId: 'sub-001',
    policyType: 'general_liability',
    carrier: 'State Farm',
    policyNumber: 'GL-123456-RH',
    expirationDate: addDays(today, -5), // EXPIRED - RED
    coverageLimit: 1000000,
    agentId: 'agent-001',
    status: 'expired',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  // ABC Electrical - sub-002
  {
    id: 'policy-003',
    subId: 'sub-002',
    policyType: 'workers_comp',
    carrier: 'Allstate',
    policyNumber: 'WC-789456-EL',
    expirationDate: addDays(today, 85), // 85 days - GREEN
    coverageLimit: 500000,
    agentId: 'agent-002',
    status: 'active',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'policy-004',
    subId: 'sub-002',
    policyType: 'general_liability',
    carrier: 'Allstate',
    policyNumber: 'GL-789456-EL',
    expirationDate: addDays(today, 92), // 92 days - GREEN
    coverageLimit: 1000000,
    agentId: 'agent-002',
    status: 'active',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  // Smith Plumbing - sub-003
  {
    id: 'policy-005',
    subId: 'sub-003',
    policyType: 'workers_comp',
    carrier: 'Nationwide',
    policyNumber: 'WC-456123-PL',
    expirationDate: addDays(today, 18), // 18 days - YELLOW
    coverageLimit: 500000,
    agentId: 'agent-003',
    status: 'active',
    createdAt: '2024-02-02T10:00:00Z',
    updatedAt: '2024-02-02T10:00:00Z'
  },
  {
    id: 'policy-006',
    subId: 'sub-003',
    policyType: 'general_liability',
    carrier: 'Nationwide',
    policyNumber: 'GL-456123-PL',
    expirationDate: addDays(today, 45), // 45 days - GREEN
    coverageLimit: 1000000,
    agentId: 'agent-003',
    status: 'active',
    createdAt: '2024-02-02T10:00:00Z',
    updatedAt: '2024-02-02T10:00:00Z'
  },
  // Pro Painting - sub-004
  {
    id: 'policy-007',
    subId: 'sub-004',
    policyType: 'workers_comp',
    carrier: 'Liberty Mutual',
    policyNumber: 'WC-654321-PA',
    expirationDate: addDays(today, 25), // 25 days - YELLOW
    coverageLimit: 500000,
    agentId: 'agent-004',
    status: 'active',
    createdAt: '2024-02-03T10:00:00Z',
    updatedAt: '2024-02-03T10:00:00Z'
  },
  {
    id: 'policy-008',
    subId: 'sub-004',
    policyType: 'general_liability',
    carrier: 'Liberty Mutual',
    policyNumber: 'GL-654321-PA',
    expirationDate: addDays(today, 72), // 72 days - GREEN
    coverageLimit: 1000000,
    agentId: 'agent-004',
    status: 'active',
    createdAt: '2024-02-03T10:00:00Z',
    updatedAt: '2024-02-03T10:00:00Z'
  },
  // Foundation Experts - sub-005
  {
    id: 'policy-009',
    subId: 'sub-005',
    policyType: 'workers_comp',
    carrier: 'State Farm',
    policyNumber: 'WC-111222-FD',
    expirationDate: addDays(today, 120), // 120 days - GREEN
    coverageLimit: 500000,
    agentId: 'agent-001',
    status: 'active',
    createdAt: '2024-02-04T10:00:00Z',
    updatedAt: '2024-02-04T10:00:00Z'
  },
  {
    id: 'policy-010',
    subId: 'sub-005',
    policyType: 'general_liability',
    carrier: 'State Farm',
    policyNumber: 'GL-111222-FD',
    expirationDate: addDays(today, 110), // 110 days - GREEN
    coverageLimit: 1000000,
    agentId: 'agent-001',
    status: 'active',
    createdAt: '2024-02-04T10:00:00Z',
    updatedAt: '2024-02-04T10:00:00Z'
  },
  // Precision Framing - sub-006
  {
    id: 'policy-011',
    subId: 'sub-006',
    policyType: 'workers_comp',
    carrier: 'Allstate',
    policyNumber: 'WC-333444-FR',
    expirationDate: addDays(today, 35), // 35 days - GREEN
    coverageLimit: 500000,
    agentId: 'agent-002',
    status: 'active',
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z'
  },
  {
    id: 'policy-012',
    subId: 'sub-006',
    policyType: 'general_liability',
    carrier: 'Allstate',
    policyNumber: 'GL-333444-FR',
    expirationDate: addDays(today, 3), // 3 days - RED
    coverageLimit: 1000000,
    agentId: 'agent-002',
    status: 'active',
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z'
  },
  // Quality Drywall - sub-007
  {
    id: 'policy-013',
    subId: 'sub-007',
    policyType: 'workers_comp',
    carrier: 'Nationwide',
    policyNumber: 'WC-555666-DW',
    expirationDate: addDays(today, 28), // 28 days - YELLOW
    coverageLimit: 500000,
    agentId: 'agent-003',
    status: 'active',
    createdAt: '2024-02-06T10:00:00Z',
    updatedAt: '2024-02-06T10:00:00Z'
  },
  {
    id: 'policy-014',
    subId: 'sub-007',
    policyType: 'general_liability',
    carrier: 'Nationwide',
    policyNumber: 'GL-555666-DW',
    expirationDate: addDays(today, 60), // 60 days - GREEN
    coverageLimit: 1000000,
    agentId: 'agent-003',
    status: 'active',
    createdAt: '2024-02-06T10:00:00Z',
    updatedAt: '2024-02-06T10:00:00Z'
  },
  // Tile Masters - sub-008
  {
    id: 'policy-015',
    subId: 'sub-008',
    policyType: 'workers_comp',
    carrier: 'Liberty Mutual',
    policyNumber: 'WC-777888-TL',
    expirationDate: addDays(today, -12), // EXPIRED - RED
    coverageLimit: 500000,
    agentId: 'agent-004',
    status: 'expired',
    createdAt: '2024-02-07T10:00:00Z',
    updatedAt: '2024-02-07T10:00:00Z'
  },
  {
    id: 'policy-016',
    subId: 'sub-008',
    policyType: 'general_liability',
    carrier: 'Liberty Mutual',
    policyNumber: 'GL-777888-TL',
    expirationDate: addDays(today, 52), // 52 days - GREEN
    coverageLimit: 1000000,
    agentId: 'agent-004',
    status: 'active',
    createdAt: '2024-02-07T10:00:00Z',
    updatedAt: '2024-02-07T10:00:00Z'
  }
];

// Email Templates table
export const emailTemplates = [
  {
    id: 'template-001',
    gcId: 'gc-001',
    templateName: 'Initial Verification Request',
    subject: 'Insurance Verification Required - {{sub_name}}',
    body: `Dear {{agent_name}},

We are requesting verification of current insurance coverage for {{sub_name}}. Please confirm the following policies are active:

Workers' Compensation Policy #: {{policy_number_wc}}
Expiration Date: {{expiration_date_wc}}

General Liability Policy #: {{policy_number_gl}}
Expiration Date: {{expiration_date_gl}}

Please respond to this email or click the link below to confirm coverage status.

Thank you,
{{gc_name}}`,
    mergeFields: ['agent_name', 'sub_name', 'policy_number_wc', 'expiration_date_wc', 'policy_number_gl', 'expiration_date_gl', 'gc_name'],
    createdAt: '2024-02-20T10:00:00Z'
  },
  {
    id: 'template-002',
    gcId: 'gc-001',
    templateName: 'Urgent Renewal Reminder',
    subject: 'Insurance Renewal Required - {{sub_name}} ({{policy_type}})',
    body: `Dear {{agent_name}},

This is an urgent reminder that {{sub_name}}'s {{policy_type}} policy expires on {{expiration_date}}.

Policy #: {{policy_number}}
Current Carrier: {{carrier}}

Please submit a renewal certificate or confirmation of continued coverage immediately.

Contact: {{gc_contact_email}} | {{gc_contact_phone}}

Regards,
{{gc_name}}`,
    mergeFields: ['agent_name', 'sub_name', 'policy_type', 'expiration_date', 'policy_number', 'carrier', 'gc_contact_email', 'gc_contact_phone', 'gc_name'],
    createdAt: '2024-02-20T10:00:00Z'
  },
  {
    id: 'template-003',
    gcId: null, // System default template
    templateName: 'Policy Lapsed Alert',
    subject: 'URGENT: Coverage Lapsed - {{sub_name}}',
    body: `Dear {{agent_name}},

We have identified that {{sub_name}}'s {{policy_type}} coverage has lapsed as of {{expiration_date}}.

This is a critical compliance issue and must be resolved immediately.

Policy #: {{policy_number}}

Please contact us within 24 hours to discuss renewal options.

{{gc_contact_email}} | {{gc_contact_phone}}`,
    mergeFields: ['agent_name', 'sub_name', 'policy_type', 'expiration_date', 'policy_number', 'gc_contact_email', 'gc_contact_phone'],
    createdAt: '2024-02-20T10:00:00Z'
  }
];

// Documents table
export const documents = [
  {
    id: 'doc-001',
    subId: 'sub-001',
    documentType: 'w9',
    filePath: '/consultant_id/sub-001/w9_2024-02-15.pdf',
    fileName: 'w9_2024-02-15.pdf',
    uploadedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'doc-002',
    subId: 'sub-001',
    documentType: 'coi',
    filePath: '/consultant_id/sub-001/coi_2024-02-15.pdf',
    fileName: 'ACORD_25_Johns_Roofing_2024.pdf',
    uploadedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'doc-003',
    subId: 'sub-002',
    documentType: 'w9',
    filePath: '/consultant_id/sub-002/w9_2024-02-15.pdf',
    fileName: 'w9_2024-02-15.pdf',
    uploadedAt: '2024-02-15T10:00:00Z'
  }
];

// Verification Requests table
export const verificationRequests = [
  {
    id: 'vr-001',
    policyId: 'policy-001',
    agentId: 'agent-001',
    gcId: 'gc-001',
    status: 'pending',
    createdAt: '2024-04-10T10:00:00Z',
    respondedAt: null,
    response: null
  },
  {
    id: 'vr-002',
    policyId: 'policy-003',
    agentId: 'agent-002',
    gcId: 'gc-001',
    status: 'responded',
    createdAt: '2024-04-08T10:00:00Z',
    respondedAt: '2024-04-09T15:30:00Z',
    response: 'Coverage confirmed active'
  }
];

// Verification Tokens table (for agent portal)
export const verificationTokens = [
  {
    id: 'token-001',
    policyId: 'policy-001',
    token: 'verify_abc123def456',
    tokenHash: 'hash_abc123def456',
    expiresAt: addDays(today, 30),
    createdAt: new Date().toISOString()
  },
  {
    id: 'token-002',
    policyId: 'policy-002',
    token: 'verify_xyz789uvw012',
    tokenHash: 'hash_xyz789uvw012',
    expiresAt: addDays(today, 30),
    createdAt: new Date().toISOString()
  }
];

// Auth Users (for mock authentication)
export const authUsers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'dawn@coververifi.com',
    password: 'password123', // MOCK ONLY - Never store plain passwords
    role: 'consultant',
    consultantId: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'user-gc-001',
    email: 'john@mountainwest.com',
    password: 'gcpass123', // MOCK ONLY
    role: 'general_contractor',
    gcId: 'gc-001',
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'user-gc-002',
    email: 'sarah@homeworks.com',
    password: 'gcpass123', // MOCK ONLY
    role: 'general_contractor',
    gcId: 'gc-002',
    createdAt: '2024-02-05T10:00:00Z'
  }
];

// Helper function to get GCs for consultant
export const getGCsByConsultant = (consultantId) => {
  return generalContractors.filter(gc => gc.consultantId === consultantId);
};

// Helper function to get subs for GC
export const getSubsByGC = (gcId) => {
  return gcSubcontractors
    .filter(link => link.gcId === gcId)
    .map(link => {
      const sub = subcontractors.find(s => s.id === link.subId);
      return { ...sub, linkId: link.id };
    });
};

// Helper function to get policies for sub
export const getPoliciesBySub = (subId) => {
  return insurancePolicies.filter(p => p.subId === subId).map(policy => {
    const agent = insuranceAgents.find(a => a.id === policy.agentId);
    return { ...policy, agent };
  });
};

// Helper function to calculate RAG status
export const calculateRAGStatus = (expirationDate) => {
  const today = new Date();
  const daysUntilExpiration = Math.floor((expirationDate - today) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiration <= 0) return 'red'; // Expired
  if (daysUntilExpiration <= 30) return 'yellow'; // Expiring soon
  return 'green'; // Compliant
};

// Helper function to get all action items (sorted by severity)
export const getAllActionItems = () => {
  const items = [];

  subcontractors.forEach(sub => {
    const policies = getPoliciesBySub(sub.id);
    policies.forEach(policy => {
      const rag = calculateRAGStatus(policy.expirationDate);
      if (rag !== 'green') {
        items.push({
          id: `action-${policy.id}`,
          subId: sub.id,
          subName: sub.companyName,
          policyId: policy.id,
          policyType: policy.policyType,
          carrier: policy.carrier,
          expirationDate: policy.expirationDate,
          rag,
          daysLeft: Math.floor((policy.expirationDate - new Date()) / (1000 * 60 * 60 * 24))
        });
      }
    });
  });

  // Sort by severity: red first, then yellow
  return items.sort((a, b) => {
    if (a.rag === 'red' && b.rag !== 'red') return -1;
    if (a.rag !== 'red' && b.rag === 'red') return 1;
    return a.daysLeft - b.daysLeft;
  });
};

// Helper to calculate portfolio stats
export const getPortfolioStats = (consultantId) => {
  const gcs = getGCsByConsultant(consultantId);
  const allSubs = [];
  let compliantCount = 0;
  let expiringCount = 0;

  gcs.forEach(gc => {
    const subs = getSubsByGC(gc.id);
    allSubs.push(...subs);
  });

  allSubs.forEach(sub => {
    const policies = getPoliciesBySub(sub.id);
    let isCompliant = true;
    policies.forEach(policy => {
      const rag = calculateRAGStatus(policy.expirationDate);
      if (rag === 'red') isCompliant = false;
      if (rag === 'yellow') expiringCount++;
    });
    if (isCompliant) compliantCount++;
  });

  const compliancePercentage = allSubs.length > 0
    ? Math.round((compliantCount / allSubs.length) * 100)
    : 0;

  return {
    totalGCs: gcs.length,
    totalSubs: allSubs.length,
    compliantSubs: compliantCount,
    expiringThisMonth: expiringCount,
    compliancePercentage
  };
};

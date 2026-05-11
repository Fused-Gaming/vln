import { createSyncPulseSkill } from '@h4shed/skill-syncpulse';

async function runSwarm() {
  console.log('Initializing SyncPulse Skill...');
  const skill = createSyncPulseSkill();

  // Get the coordinate_agents tool
  const coordinateAgentsTool = skill.tools.find(t => t.name === 'coordinate_agents');

  if (!coordinateAgentsTool) {
    console.error('coordinate_agents tool not found');
    process.exit(1);
  }

  console.log('Starting agent swarm coordination...\n');

  // Define a sample workflow with multiple tasks
  const workflowId = `vln-swarm-${Date.now()}`;
  const topology = process.argv[2] || 'hierarchical'; // Allow topology override via CLI arg

  const tasks = [
    {
      id: 'task-1',
      name: 'Security Audit Analysis',
      priority: 10,
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      id: 'task-2',
      name: 'Risk Assessment',
      priority: 8,
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      id: 'task-3',
      name: 'Report Generation',
      priority: 5,
      status: 'pending',
      createdAt: Date.now(),
    },
  ];

  try {
    const result = await coordinateAgentsTool.handler({
      workflowId,
      topology,
      tasks,
    });

    console.log('\n✅ Swarm Execution Complete');
    console.log('Workflow ID:', workflowId);
    console.log('Topology:', topology);
    console.log('Results:', JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('\n❌ Swarm Execution Failed');
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

runSwarm();

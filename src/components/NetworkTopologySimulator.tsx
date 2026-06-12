import { useState, useEffect, useRef } from 'react';
import { 
  Network, 
  Terminal, 
  Cpu, 
  Play, 
  ShieldAlert, 
  Shield, 
  Check, 
  Activity, 
  Radio, 
  Server,
  Key
} from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  vlan: number;
  ipRange: string;
  vlsmMask: string;
  allocatedFor: string;
  status: 'online' | 'compromised' | 'offline';
  connectedTo: string[];
}

const defaultNodes: NetworkNode[] = [
  {
    id: 'node-core',
    name: 'Cisco Core Switch Catalyst 3850',
    vlan: 1,
    ipRange: '10.0.0.1',
    vlsmMask: '/30',
    allocatedFor: 'Transit Infrastructure Backbone',
    status: 'online',
    connectedTo: ['node-staff', 'node-students', 'node-dentistry', 'node-mesh']
  },
  {
    id: 'node-staff',
    name: 'Administrative Staff Switch (2960)',
    vlan: 10,
    ipRange: '192.168.10.0',
    vlsmMask: '/24',
    allocatedFor: 'Staff PC Working Stations & Files',
    status: 'online',
    connectedTo: ['node-core']
  },
  {
    id: 'node-students',
    name: 'CCNA Student Labs Switch (2960)',
    vlan: 20,
    ipRange: '192.168.20.0',
    vlsmMask: '/25',
    allocatedFor: 'Cisco Routing Labs & Workspaces',
    status: 'online',
    connectedTo: ['node-core']
  },
  {
    id: 'node-dentistry',
    name: 'Dentistry Centralized DB Node (iDENTify)',
    vlan: 30,
    ipRange: '192.168.30.0',
    vlsmMask: '/28',
    allocatedFor: 'LPU Dentistry SQL Treatment Records',
    status: 'online',
    connectedTo: ['node-core']
  },
  {
    id: 'node-mesh',
    name: 'Deco Campus Mesh Access Point',
    vlan: 40,
    ipRange: '172.16.40.0',
    vlsmMask: '/22',
    allocatedFor: 'Wi-Fi Hotspots Client Devices',
    status: 'online',
    connectedTo: ['node-core']
  }
];

export default function NetworkTopologySimulator() {
  const [nodes, setNodes] = useState<NetworkNode[]>(defaultNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-core');
  const [cliLogs, setCliLogs] = useState<string[]>([
    'Cisco IOS (tm) Catalyst L3 Switch Software, Version 15.2(2)E, RELEASE SOFTWARE (fc1)',
    'Technical Support: http://www.cisco.com/techsupport',
    'Copyright (c) 1986-2025 by Cisco Systems, Inc.',
    '',
    'CoreSwitch# enable',
    'CoreSwitch# show ip interface brief'
  ]);
  const [activeCliCommand, setActiveCliCommand] = useState<string>('');
  const [ipsActive, setIpsActive] = useState<boolean>(true);
  const cliEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cliEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cliLogs]);

  // Current selected node details
  const activeNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  // Run canned Cisco CLI commands
  const runCiscoCommand = (command: string, linesBefore: string[] = []) => {
    setActiveCliCommand(command);
    
    // Quick typing animation simulation
    setTimeout(() => {
      let outputLines: string[] = [];

      switch (command) {
        case 'show ip route':
          outputLines = [
            `CoreSwitch# show ip route`,
            `Codes: C - connected, S - static, R - RIP, M - mobile, B - BGP`,
            `       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area`,
            `Gateway of last resort is 10.0.0.1 to network 0.0.0.0`,
            ``,
            `      10.0.0.0/8 is subnetted, 1 subnets`,
            `C        10.0.0.0/30 is directly connected, GigabitEthernet0/1`,
            `O    192.168.10.0/24 [110/2] via 10.0.0.2, 12:44:03, G0/2`,
            `O    192.168.20.0/25 [110/2] via 10.0.0.3, 12:44:03, G0/3`,
            `C    192.168.30.0/28 directly connected, DentistryDBvlan30, G0/4`,
            `O    172.16.40.0/22 [110/4] via 10.0.0.5, 08:12:11, G0/5`
          ];
          break;

        case 'show vlan brief':
          outputLines = [
            `CoreSwitch# show vlan brief`,
            ``,
            `VLAN Name                             Status    Ports`,
            `---- -------------------------------- --------- -------------------------------`,
            `1    default                          active    Gi0/6, Gi0/7, Gi0/8`,
            `10   Admin_Staff_VLAN10               active    Gi0/2, Fa0/1, Fa0/2, Fa0/3`,
            `20   Student_Labs_VLAN20              active    Gi0/3, Fa0/4, Fa0/5, Fa0/6`,
            `30   Dentistry_iDENTify_VLAN30        active    Gi0/4, Fa0/10`,
            `40   Mesh_Wi-Fi_VLAN40                active    Gi0/5`,
            `---- -------------------------------- --------- -------------------------------`
          ];
          break;

        case 'ping 192.168.30.10':
          outputLines = [
            `CoreSwitch# ping 192.168.30.10`,
            `Type escape sequence to abort.`,
            `Sending 5, 100-byte ICMP Echos to 192.168.30.10 (Dentistry DB Server), timeout is 2 seconds:`,
            `!!!!!`,
            `Success rate is 100 percent (5/5), round-trip min/avg/max = 1/4/8 ms`
          ];
          break;

        case 'ping 172.16.40.1':
          outputLines = [
            `CoreSwitch# ping 172.16.40.1`,
            `Type escape sequence to abort.`,
            `Sending 5, 100-byte ICMP Echos to 172.16.40.1 (Deco Mesh Gateway), timeout is 2 seconds:`,
            `!!!!!`,
            `Success rate is 100 percent (5/5), round-trip min/avg/max = 2/11/18 ms`
          ];
          break;

        case 'configure terminal && enable IPS':
          outputLines = [
            `CoreSwitch# configure terminal`,
            `Enter configuration commands, one per line.  End with CNTL/Z.`,
            `CoreSwitch(config)# ip ips signature-category category all`,
            `CoreSwitch(config-ips-cat)# retired false`,
            `CoreSwitch(config-ips-cat-ret)# exit`,
            `CoreSwitch(config)# service-policy ips virtual-sensor1-policy global`,
            `CoreSwitch(config)# exit`,
            `*Jun  8 12:50:04.103: %IPS-4-ENABLED: Intrusion Prevention Engine online & active. SECURE.`
          ];
          setIpsActive(true);
          setNodes(prev => prev.map(n => ({ ...n, status: 'online' })));
          break;

        case 'simulate attack':
          outputLines = [
            `CoreSwitch# ./simulate_lateral_spoofing_attack`,
            `*Jun  8 12:51:19.412: %SEC-6-IP_SPOOF_INTRUSION: ARP spoof packet detected from range 192.168.20.14.`
          ];
          if (!ipsActive) {
            outputLines.push(
              `*Jun  8 12:51:21.002: %SYS-2-FATAL_FLOOD: VLAN 30 (iDENTify DB Node) is undergoing heavy queries flood!`,
              `*Jun  8 12:51:22.115: %PORT-4-ERRDISABLE: Dentistry interface G0/4 placed in error-disabled state. COMPROMISED!`
            );
            setNodes(prev => prev.map(n => {
              if (n.id === 'node-dentistry') {
                return { ...n, status: 'compromised' };
              }
              return n;
            }));
          } else {
            outputLines.push(
              `*Jun  8 12:51:20.111: %IPS-4-SIGNATURE_MATCH: Shield block applied. Intrusion signature ID 1209 matched.`,
              `*Jun  8 12:51:20.199: %SEC-5-BLOCKED: Intruder node 192.168.20.14 blacklisted instantly on interface Fa0/4. Node isolated.`,
              `System Integrity SECURED.`
            );
          }
          break;

        default:
          outputLines = [`CoreSwitch# ${command}`, 'Invalid command string.'];
      }

      setCliLogs(prev => [...prev, ...outputLines, '']);
      setActiveCliCommand('');
    }, 700);
  };

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col gap-6" id="network-simulator-root">
      
      {/* Visual top border glow */}
      <div className="absolute top-0 right-0 w-64 h-64 glow-spot-1 rounded-full pointer-events-none opacity-20"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20 text-[10px] font-mono font-bold tracking-wider uppercase mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Cisco Enterprise Network Sandbox
          </div>
          <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
            CCNA Network Topology Simulator
          </h3>
          <p className="text-gray-400 text-xs mt-0.5 font-sans">
            Model and test Classless VLSM subnetting, VLAN segregation, and hardware firewall rules in real-time.
          </p>
        </div>

        {/* Cisco IPS Shield toggler */}
        <button
          onClick={() => {
            if (ipsActive) {
              setIpsActive(false);
              setCliLogs(prev => [...prev, `CoreSwitch# no service-policy ips virtual-sensor1-policy global`, `*Jun  8 12:53:14.301: %IPS-3-DISABLED: Cisco Hardware IPS turned off. UNSAFE state.`, '']);
            } else {
              setIpsActive(true);
              setCliLogs(prev => [...prev, `CoreSwitch# service-policy ips virtual-sensor1-policy global`, `*Jun  8 12:53:19.412: %IPS-4-ENABLED: Cisco Hardware IPS active. SHIELDING.`, '']);
              setNodes(prev => prev.map(n => ({ ...n, status: 'online' })));
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-extrabold border cursor-pointer transition-all ${
            ipsActive 
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
              : 'bg-red-500/15 text-red-500 border-red-500/30 font-bold shake'
          }`}
        >
          {ipsActive ? <Shield className="w-4 h-4 text-emerald-400 animate-pulse" /> : <ShieldAlert className="w-4 h-4 text-red-500" />}
          <span>{ipsActive ? 'Cisco IPS Guard: ACTIVE' : 'Cisco IPS Guard: OFF (VULNERABLE)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COMPONENT: Interactive Topology Workspace map */}
        <div className="lg:col-span-6 flex flex-col gap-4 bg-slate-cyber-light/10 p-5 rounded-xl border border-white/5 justify-between relative min-h-[350px]">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-black block">
            Logical Network Mapping Layout
          </span>

          {/* Graphical nodes mapping */}
          <div className="flex flex-col gap-4 py-4 relative z-10 select-none">
            {nodes.map((n) => {
              const isSelected = n.id === selectedNodeId;
              const statusColors = {
                online: 'border-blue-500/40 text-blue-400 bg-blue-500/5',
                compromised: 'border-red-500 text-red-500 bg-red-500/10 animate-ping-slow',
                offline: 'border-gray-600 text-gray-500 bg-gray-500/5'
              }[n.status];

              const ringClass = isSelected 
                ? 'border-electric ring-2 ring-electric/30 shadow-[0_0_15px_rgba(0,229,255,0.2)] scale-[1.02]' 
                : 'border-white/5 hover:border-white/20';

              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNodeId(n.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${ringClass} ${statusColors}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0`}>
                      {n.id === 'node-core' ? <Cpu className="w-5 h-5 text-gray-300" /> : n.id === 'node-dentistry' ? <Server className="w-5 h-5 text-cyan-400" /> : <Network className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-display font-bold text-white uppercase tracking-wide leading-tight">
                        {n.name}
                      </h4>
                      <p className="text-[10px] font-mono text-gray-400 mt-1">
                        VLAN {n.vlan} • IP: {n.ipRange} ({n.vlsmMask})
                      </p>
                    </div>
                  </div>

                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase ${
                    n.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/20 text-red-400 font-bold'
                  }`}>
                    {n.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Technical sub-metrics */}
          <div className="border-t border-white/5 pt-4 flex flex-col gap-1 text-[11px] font-sans text-gray-400 leading-snug">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">Currently Inspecting Node Roles:</span>
            <p>
              <strong className="text-white font-mono uppercase">{activeNode.name}</strong> is designed for <span className="text-electric">{activeNode.allocatedFor}</span> and segregates frames securely under virtual VLAN {activeNode.vlan}.
            </p>
          </div>
        </div>

        {/* RIGHT COMPONENT: Visual Interactive CLI Terminal Console */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          
          {/* Cyber Terminal screen container */}
          <div className="flex-1 bg-black/80 border border-white/10 rounded-xl p-4 font-mono text-xs text-gray-300 flex flex-col text-left justify-between h-[300px] overflow-hidden shadow-2xl relative">
            
            {/* Gloss light reflection */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10"></div>
            
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 select-none text-[10px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>Cisco IOS Core Terminal Console v15.2</span>
              </div>
              <span className="text-electric animate-pulse">● SECURE ROUTING SYSTEM LIVE</span>
            </div>

            {/* Scrollable CLI logs viewport */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1 max-h-[220px] mb-2 leading-relaxed text-[11px]">
              {cliLogs.map((logLine, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {logLine.startsWith('CoreSwitch#') || logLine.startsWith('CoreSwitch(') ? (
                    <span className="text-electric font-bold">{logLine}</span>
                  ) : logLine.includes('compromised') || logLine.includes('COMPROMISED') || logLine.includes('UNSAFE') ? (
                    <span className="text-red-500 font-bold">{logLine}</span>
                  ) : logLine.includes('SECURE') || logLine.includes('Success rate is 100 percent') || logLine.includes('online & active') ? (
                    <span className="text-emerald-400 font-bold">{logLine}</span>
                  ) : (
                    <span>{logLine}</span>
                  )}
                </div>
              ))}
              {activeCliCommand && (
                <div className="text-electric font-bold animate-pulse">
                  CoreSwitch# {activeCliCommand}_
                </div>
              )}
              <div ref={cliEndRef} />
            </div>

            {/* Simulated typing status */}
            {activeCliCommand && (
              <span className="text-[10px] text-gray-500 select-none animate-pulse">Running Cisco IOS configuration updates...</span>
            )}
          </div>

          {/* Pre-packaged CLI Script selectors buttons */}
          <div className="flex flex-col gap-2 p-4 bg-slate-cyber-light/15 border border-white/5 rounded-xl">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-black block">
              Inject IOS Terminal Automation Scripts
            </span>
            
            <div className="grid grid-cols-2 gap-2 mt-1" id="cisco-commands-grid">
              <button
                disabled={!!activeCliCommand}
                onClick={() => runCiscoCommand('show ip route')}
                className="py-2 px-3 text-[11px] font-mono font-medium rounded-lg bg-slate-cyber/60 hover:bg-blue-500 hover:text-white text-gray-300 border border-white/5 transition-all text-left cursor-pointer truncate"
              >
                show ip route
              </button>
              <button
                disabled={!!activeCliCommand}
                onClick={() => runCiscoCommand('show vlan brief')}
                className="py-2 px-3 text-[11px] font-mono font-medium rounded-lg bg-slate-cyber/60 hover:bg-blue-500 hover:text-white text-gray-300 border border-white/5 transition-all text-left cursor-pointer truncate"
              >
                show vlan brief
              </button>
              <button
                disabled={!!activeCliCommand}
                onClick={() => runCiscoCommand('ping 192.168.30.10')}
                className="py-2 px-3 text-[11px] font-mono font-medium rounded-lg bg-slate-cyber/60 hover:bg-blue-500 hover:text-white text-gray-300 border border-white/5 transition-all text-left cursor-pointer truncate"
              >
                ping Dentistry DB (VLAN 30)
              </button>
              <button
                disabled={!!activeCliCommand}
                onClick={() => runCiscoCommand('ping 172.16.40.1')}
                className="py-2 px-3 text-[11px] font-mono font-medium rounded-lg bg-slate-cyber/60 hover:bg-blue-500 hover:text-white text-gray-300 border border-white/5 transition-all text-left cursor-pointer truncate"
              >
                ping Mesh Wi-Fi (VLAN 40)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1 border-t border-white/5 pt-2.5">
              <button
                disabled={!!activeCliCommand}
                onClick={() => runCiscoCommand('configure terminal && enable IPS')}
                className="py-2 px-3 text-[11px] font-mono font-black rounded-lg bg-emerald-500/10 hover:bg-emerald-500 hover:text-slate-cyber text-emerald-400 border border-emerald-500/20 transition-all text-left cursor-pointer truncate flex items-center justify-between"
              >
                <span>Enable IPS Firewall</span>
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
              </button>
              <button
                disabled={!!activeCliCommand}
                onClick={() => runCiscoCommand('simulate attack')}
                className="py-2 px-3 text-[11px] font-mono font-black rounded-lg bg-red-500/15 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 transition-all text-left cursor-pointer truncate flex items-center justify-between"
              >
                <span>Launch VLAN Attack</span>
                <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0 ml-1" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

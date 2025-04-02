import React, { useState } from 'react';

const initialLevels = {
  1: [], 2: [], 3: [], 4: []
};

const App: React.FC = () => {
  const [levels, setLevels] = useState<{ [key: number]: string[] }>(initialLevels);
  const [hostTeam, setHostTeam] = useState<string>('الأهلي');
  const [groups, setGroups] = useState<{ [key: string]: string[] }>({});
  const [tournamentName, setTournamentName] = useState<string>('بطولة إفريقيا للأندية لكرة اليد');

  const handleDraw = () => {
    const groupNames = ['A', 'B', 'C', 'D'];
    const result: any = { A: [hostTeam], B: [], C: [], D: [] };

    const tempLevels: { [key: number]: string[] } = JSON.parse(JSON.stringify(levels));
    tempLevels[1] = tempLevels[1].filter(t => t !== hostTeam);

    for (let level = 1; level <= 4; level++) {
      const teams = [...tempLevels[level]].sort(() => Math.random() - 0.5);
      let groupIndex = 0;

      for (let team of teams) {
        if (level === 1 && groupNames[groupIndex] === 'A') {
          groupIndex++;
        }
        result[groupNames[groupIndex]].push(team);
        groupIndex++;
      }
    }
    setGroups(result);
  };

  const handleTeamChange = (level: number, index: number, value: string) => {
    const updated = [...levels[level]];
    updated[index] = value;
    setLevels({ ...levels, [level]: updated });
  };

  const addTeam = (level: number) => {
    setLevels({ ...levels, [level]: [...levels[level], ''] });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <input
          type="text"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          className="text-2xl font-bold text-center border-b-2 border-gray-400 mb-2 w-full"
        />
        <div className="flex justify-center gap-4 mt-2">
          <div className="w-16 h-16 bg-gray-200">شعار الأهلي</div>
          <div className="w-16 h-16 bg-gray-200">شعار الاتحاد</div>
          <div className="w-16 h-16 bg-gray-200">شعار البطولة</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[1, 2, 3, 4].map(level => (
          <div key={level}>
            <h3 className="font-semibold">المستوى {level}</h3>
            {levels[level].map((team, idx) => (
              <input
                key={idx}
                type="text"
                value={team}
                onChange={(e) => handleTeamChange(level, idx, e.target.value)}
                className="border p-1 w-full mb-1"
              />
            ))}
            <button
              onClick={() => addTeam(level)}
              className="bg-blue-500 text-white px-2 py-1 text-sm mt-1 rounded"
            >
              إضافة فريق
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleDraw}
        className="bg-green-600 text-white px-6 py-2 rounded mb-6"
      >
        إجراء القرعة
      </button>

      {Object.keys(groups).length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(groups).map(([group, teams]) => (
            <div key={group} className="border rounded p-3 bg-gray-50">
              <h4 className="font-bold mb-2">المجموعة {group}</h4>
              {teams.map((team, idx) => (
                <div key={idx} className="mb-1">{team}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
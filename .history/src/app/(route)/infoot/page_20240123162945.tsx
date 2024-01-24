import React, { useState } from 'react';
import '../_style/PatternLock.css'; // 스타일 파일 추가

interface PatternLockProps {
  onPatternSet: (pattern: number[]) => void;
  onPatternCheck: (pattern: number[]) => void;
}

const PatternLock: React.FC<PatternLockProps> = ({ onPatternSet, onPatternCheck }) => {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);

  const handleCellClick = (cellId: number) => {
    if (selectedCells.includes(cellId)) return;

    const newSelectedCells = [...selectedCells, cellId];
    setSelectedCells(newSelectedCells);

    if (newSelectedCells.length === 9) {
      // 패턴 설정 또는 확인
      onPatternSet(newSelectedCells); // 패턴 설정
      // onPatternCheck(newSelectedCells); // 패턴 확인
      setSelectedCells([]);
    }
  };

  const renderCells = () => {
    const cells: JSX.Element[] = [];

    for (let i = 0; i < 9; i++) {
      cells.push(
        <div
          key={i}
          className={`cell ${selectedCells.includes(i) ? 'selected' : ''}`}
          onClick={() => handleCellClick(i)}
        >
          {i + 1}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="pattern-lock">
      <div className="grid">{renderCells()}</div>
    </div>
  );
};

export default PatternLock;

"use client"
import React, { useState } from 'react';

interface PuzzleCell {
  id: number;
  value: number;
}

const initialPuzzle: PuzzleCell[] = Array.from({ length: 25 }, (_, index) => ({ id: index, value: index + 1 }));

const Puzzle: React.FC = () => {
  const [puzzleCells, setPuzzleCells] = useState<PuzzleCell[]>(initialPuzzle);

  const handleCellClick = (clickedCell: PuzzleCell) => {
    const emptyCellIndex = puzzleCells.findIndex((cell) => cell.value === 25);
    const clickedCellIndex = puzzleCells.findIndex((cell) => cell.id === clickedCell.id);

    if (isAdjacent(emptyCellIndex, clickedCellIndex)) {
      const newPuzzleCells = [...puzzleCells];
      [newPuzzleCells[emptyCellIndex], newPuzzleCells[clickedCellIndex]] = [
        newPuzzleCells[clickedCellIndex],
        newPuzzleCells[emptyCellIndex],
      ];
      setPuzzleCells(newPuzzleCells);
    }
  };

  const isAdjacent = (emptyIndex: number, clickedIndex: number): boolean => {
    const rowDiff = Math.abs(Math.floor(emptyIndex / 5) - Math.floor(clickedIndex / 5));
    const colDiff = Math.abs((emptyIndex % 5) - (clickedIndex % 5));
    return (rowDiff === 1 && colDiff === 0) || (colDiff === 1 && rowDiff === 0);
  };

  return (
    <div>
      <h1>5x5 Puzzle</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gridGap: '5px' }}>
        {puzzleCells.map((cell) => (
          <div
            key={cell.id}
            style={{
              width: '50px',
              height: '50px',
              border: '1px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: cell.value === 25 ? '#333' : '#fff',
            }}
            onClick={() => handleCellClick(cell)}
          >
            {cell.value !== 25 && cell.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Puzzle;

import React, { Component } from 'react';
import Node from './Node/Node';
import './Pathfinder.css';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { dfs } from '../algorithms/dfs';
import { bfs } from '../algorithms/bfs';
import { astar } from '../algorithms/Astar';

const TOTAL_ROW = 15;
const TOTAL_COL = 50;
const START_NODE_ROW = Math.floor(Math.random() * TOTAL_ROW);
const START_NODE_COL = Math.floor(Math.random() * TOTAL_COL);
const FINISH_NODE_ROW = Math.floor(Math.random() * TOTAL_ROW);
const FINISH_NODE_COL = Math.floor(Math.random() * TOTAL_COL);
const BOMB_ROW = Math.floor(Math.random() * TOTAL_ROW);
const BOMB_COL = Math.floor(Math.random() * TOTAL_COL);

let nodesInOrderG = [];
let intermediateNodesInOrderG = [];
let shortestPathG = [];

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      mouseIsPressed: false,
      bombActive: false,
      isFast: true,
      shortest_path_node_count: 0,
    };
  }

  componentDidMount() {
    this.makeGrid();
  }

  makeGrid = () => {
    const nodes = [];
    for (let row = 0; row < TOTAL_ROW; row++) {
      const currRow = [];
      for (let col = 0; col < TOTAL_COL; col++) {
        currRow.push(singleNode(row, col));
      }
      nodes.push(currRow);
    }
    this.setState({ nodes });
  };

  // ---------------- ALGORITHMS ----------------

  applyDijkstra() {
    const { nodes, bombActive } = this.state;
    let intermediateNodesInOrder = [];
    if (bombActive) {
      const intermediateStart = nodes[START_NODE_ROW][START_NODE_COL];
      const intermediateEnd = nodes[BOMB_ROW][BOMB_COL];
      intermediateNodesInOrder = dijkstra(nodes, intermediateStart, intermediateEnd);
      const newGrid = getNewGridWithDistanceInfy(nodes);
      this.setState({ nodes: newGrid });

      const startNode = nodes[BOMB_ROW][BOMB_COL];
      const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
      const nodesInOrder = dijkstra(nodes, startNode, finishNode);
      const shortestPath = getNodesInShortestPathOrder(finishNode);
      this.animate(nodesInOrder, shortestPath, intermediateNodesInOrder);
      nodesInOrderG = nodesInOrder;
      intermediateNodesInOrderG = intermediateNodesInOrder;
      shortestPathG = shortestPath;
    } else {
      const startNode = nodes[START_NODE_ROW][START_NODE_COL];
      const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
      const nodesInOrder = dijkstra(nodes, startNode, finishNode);
      const shortestPath = getNodesInShortestPathOrder(finishNode);
      this.animate(nodesInOrder, shortestPath, intermediateNodesInOrder);
      nodesInOrderG = nodesInOrder;
      shortestPathG = shortestPath;
    }
  }

  applyDfs() {
    const { nodes, bombActive } = this.state;
    let intermediateNodesInOrder = [];
    if (bombActive) {
      const intermediateStart = nodes[START_NODE_ROW][START_NODE_COL];
      const intermediateEnd = nodes[BOMB_ROW][BOMB_COL];
      intermediateNodesInOrder = dfs(nodes, intermediateStart, intermediateEnd);
      const newGrid = getNewGridWithDistanceInfy(nodes);
      this.setState({ nodes: newGrid });

      const startNode = nodes[BOMB_ROW][BOMB_COL];
      const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
      const nodesInOrder = dfs(nodes, startNode, finishNode);
      const shortestPath = getNodesInShortestPathOrder(finishNode);
      this.animate(nodesInOrder, shortestPath, intermediateNodesInOrder);
      nodesInOrderG = nodesInOrder;
      intermediateNodesInOrderG = intermediateNodesInOrder;
      shortestPathG = shortestPath;
    } else {
      const startNode = nodes[START_NODE_ROW][START_NODE_COL];
      const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
      const nodesInOrder = dfs(nodes, startNode, finishNode);
      const shortestPath = getNodesInShortestPathOrder(finishNode);
      this.animate(nodesInOrder, shortestPath, intermediateNodesInOrder);
      nodesInOrderG = nodesInOrder;
      shortestPathG = shortestPath;
    }
  }

  applyBfs() {
    const { nodes, bombActive } = this.state;
    let intermediateNodesInOrder = [];
    if (bombActive) {
      const intermediateStart = nodes[START_NODE_ROW][START_NODE_COL];
      const intermediateEnd = nodes[BOMB_ROW][BOMB_COL];
      intermediateNodesInOrder = bfs(nodes, intermediateStart, intermediateEnd);
      const newGrid = getNewGridWithDistanceInfy(nodes);
      this.setState({ nodes: newGrid });

      const startNode = nodes[BOMB_ROW][BOMB_COL];
      const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
      const nodesInOrder = bfs(nodes, startNode, finishNode);
      const shortestPath = getNodesInShortestPathOrder(finishNode);
      this.animate(nodesInOrder, shortestPath, intermediateNodesInOrder);
      nodesInOrderG = nodesInOrder;
      intermediateNodesInOrderG = intermediateNodesInOrder;
      shortestPathG = shortestPath;
    } else {
      const startNode = nodes[START_NODE_ROW][START_NODE_COL];
      const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
      const nodesInOrder = bfs(nodes, startNode, finishNode);
      const shortestPath = getNodesInShortestPathOrder(finishNode);
      this.animate(nodesInOrder, shortestPath, intermediateNodesInOrder);
      nodesInOrderG = nodesInOrder;
      shortestPathG = shortestPath;
    }
  }

  applyAstar() {
    const { nodes, bombActive } = this.state;
    let intermediateNodesInOrder = [];
    if (bombActive) {
      const intermediateStart = nodes[START_NODE_ROW][START_NODE_COL];
      const intermediateEnd = nodes[BOMB_ROW][BOMB_COL];
      intermediateNodesInOrder = astar(nodes, intermediateStart, intermediateEnd);
      const newGrid = getNewGridWithDistanceInfy(nodes);
      this.setState({ nodes: newGrid });

      const startNode = nodes[BOMB_ROW][BOMB_COL];
      const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
      const nodesInOrder = astar(nodes, startNode, finishNode);
      const shortestPath = getNodesInShortestPathOrder(finishNode);
      this.animate(nodesInOrder, shortestPath, intermediateNodesInOrder);
      nodesInOrderG = nodesInOrder;
      intermediateNodesInOrderG = intermediateNodesInOrder;
      shortestPathG = shortestPath;
    } else {
      const startNode = nodes[START_NODE_ROW][START_NODE_COL];
      const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
      const nodesInOrder = astar(nodes, startNode, finishNode);
      const shortestPath = getNodesInShortestPathOrder(finishNode);
      this.animate(nodesInOrder, shortestPath, intermediateNodesInOrder);
      nodesInOrderG = nodesInOrder;
      shortestPathG = shortestPath;
    }
  }

  // ---------------- ANIMATION ----------------

  deanimate(nodesInOrder, shortestPath, intermediateNodesInOrder) {
    this.makeGrid();
    this.setState({ shortest_path_node_count: 0 });

    if (this.state.bombActive === true) {
      this.setState({ bombActive: false });
      getNewGridWithBombToggled(this.state.nodes);
    }

    for (let i = 0; i < intermediateNodesInOrder.length; i++) {
      const node = intermediateNodesInOrder[i];
      if (!node) continue;
      const el = document.getElementById(`node-${node.row}-${node.col}`);
      if (el) el.className = 'node';
    }

    for (let i = 0; i < nodesInOrder.length; i++) {
      const node = nodesInOrder[i];
      if (!node) continue;
      const el = document.getElementById(`node-${node.row}-${node.col}`);
      if (el) el.className = 'node';
    }
  }

  animate(nodesInOrder, shortestPath, intermediateNodesInOrder) {
    const { isFast } = this.state;
    const speed = isFast ? 10 : 50;

    for (let i = 0; i < intermediateNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = intermediateNodesInOrder[i];
        if (!node) return;
        const el = document.getElementById(`node-${node.row}-${node.col}`);
        if (el) el.className = 'node node-visited2';
      }, speed * i);
    }

    setTimeout(() => {
      for (let i = 0; i < nodesInOrder.length; i++) {
        setTimeout(() => {
          const node = nodesInOrder[i];
          if (!node) return;
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) el.className = 'node node-visited';
        }, speed * i);
      }

      setTimeout(() => {
        this.animateShortestPath(shortestPath);
        this.setState({ shortest_path_node_count: shortestPathG.length });
      }, speed * nodesInOrder.length);
    }, speed * intermediateNodesInOrder.length);
  }

  animateShortestPath(shortestPath) {
    const { isFast, bombActive } = this.state;
    const speed = isFast ? 10 : 50;
    let passedBomb = false;

    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        if (!node) return;

        if (bombActive && node.row === BOMB_ROW && node.col === BOMB_COL) {
          passedBomb = true;
        }

        const el = document.getElementById(`node-${node.row}-${node.col}`);
        if (el)
          el.className = passedBomb
            ? 'node node-shortest-path2'
            : 'node node-shortest-path';
      }, speed * i);
    }
  }

  // ---------------- INTERACTIONS ----------------

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.nodes, row, col);
    this.setState({ nodes: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.nodes, row, col);
    this.setState({ nodes: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  checkBomb() {
    const { bombActive } = this.state;
    const newGrid = getNewGridWithBombToggled(this.state.nodes);
    this.setState({ bombActive: !bombActive, nodes: newGrid });
  }

  checkFast() {
    this.setState((prev) => ({ isFast: !prev.isFast }));
  }

  generateMaze() {
    if (this.state.bombActive) return;
    for (let i = 0; i < (TOTAL_ROW * TOTAL_COL) / 3; i++) {
      const r = Math.floor(Math.random() * TOTAL_ROW);
      const c = Math.floor(Math.random() * TOTAL_COL);
      if (r === START_NODE_ROW && c === START_NODE_COL) continue;
      if (r === FINISH_NODE_ROW && c === FINISH_NODE_COL) continue;
      const newGrid = getNewGridWithWallToggled(this.state.nodes, r, c);
      this.setState({ nodes: newGrid });
    }
  }

  // ---------------- RENDER ----------------

  render() {
    const { nodes, mouseIsPressed, bombActive } = this.state;
    return (
      <div>
        <div className="header">
          <h1 className="header_h1">Pathfinder Visualizer</h1>
          <div className="header_comp">
            <div className="dropdown">
              <button
                className="dropdown-toggle dropdown_btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Algorithm
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={() => this.applyDijkstra()}>
                    Dijkstra's
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => this.applyDfs()}>
                    DFS
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => this.applyBfs()}>
                    BFS
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => this.applyAstar()}>
                    A*
                  </a>
                </li>
              </ul>
            </div>
            <button onClick={() => this.checkBomb()}>Gift</button>
            <button onClick={() => this.checkFast()}>Fast</button>
            <button onClick={() => this.generateMaze()}>Random Maze</button>
          </div>
        </div>

        <div className="home">
          <div className="grid">
            {nodes.map((row, rowIdx) => (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall, isBomb, shortest_path_node_count } =
                    node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      isBomb={isBomb}
                      shortest_path_node_count={shortest_path_node_count}
                      bombActive={bombActive}
                    ></Node>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="bottom_btn">
            <button onClick={() => this.deanimate(nodesInOrderG, shortestPathG, intermediateNodesInOrderG)}>
              Clear
            </button>
            <h3 className="bottom_label">
              Shortest Path: <label className="bottom_l">{this.state.shortest_path_node_count}</label>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

// ---------------- UTIL FUNCTIONS ----------------

const singleNode = (row, col) => ({
  row,
  col,
  isStart: row === START_NODE_ROW && col === START_NODE_COL,
  isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
  distance: Infinity,
  isVisited: false,
  isWall: false,
  previousNode: null,
  isBomb: false,
  distanceToFinishNode: Math.abs(FINISH_NODE_ROW - row) + Math.abs(FINISH_NODE_COL - col),
});

const getNewGridWithWallToggled = (nodes, row, col) => {
  const newGrid = nodes.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithBombToggled = (nodes) => {
  const newGrid = nodes.slice();
  const node = newGrid[BOMB_ROW][BOMB_COL];
  let newNode;
  if (node.isWall) {
    newNode = { ...node, isBomb: !node.isBomb, isWall: false };
  } else {
    newNode = { ...node, isBomb: !node.isBomb };
  }
  newGrid[BOMB_ROW][BOMB_COL] = newNode;
  return newGrid;
};

const getNewGridWithDistanceInfy = (nodes) => {
  const newGrid = nodes.slice();
  for (let row = 0; row < TOTAL_ROW; row++) {
    for (let col = 0; col < TOTAL_COL; col++) {
      const node = newGrid[row][col];
      const newNode = { ...node, distance: Infinity, isVisited: false };
      newGrid[row][col] = newNode;
    }
  }
  return newGrid;
};

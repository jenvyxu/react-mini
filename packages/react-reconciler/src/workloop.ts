import { completeWork } from "./beginWork";
import { beginWork } from "./completeWork";
import { FiberNode } from "./fiber";

// 正在执行的FiberNode
let workInProgress: FiberNode|null = null

function prepareFreshStack(fiber: FiberNode) {
  workInProgress = fiber
}

function renderRoot(root: FiberNode) {
  prepareFreshStack(root)
  do {
    try{
      workloop();
      break;
    } catch (e) {
      console.warn("workloop出错",e)
      workInProgress = null
    }

  } while(true)
}

function workloop() {
  while(workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber)
  if(next === null) {
    completeUnitOfWork(fiber)
  } else {
    workInProgress = next
  }
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber
  do {
    completeWork(node);
    const sibling = node.sibling;
    if(sibling !== null) {
      workInProgress = sibling
      return
    }
    node = node.return
    workInProgress = node
    
  } while(node !== null)

}
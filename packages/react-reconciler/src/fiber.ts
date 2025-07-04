import { Key, Props, Ref } from 'shared/ReactTypes';
import { Flags, NoFlags } from './fiberFlags';
import { WorkTag } from './workTags';

export class FiberNode {
  type: any;
  tag: WorkTag;
  pendingProps: any;
  key: Key;
  stateNode: any;
  ref: Ref;

  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  index: number;

  memoizedProps: Props | null;
  alternate: FiberNode | null;
  flags: Flags;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.pendingProps = pendingProps;
    this.key = key;
    // 真实的DOM
    this.stateNode = null;
    // tag 的内容, 函数组件就是函数本身
    this.type = null;

    // 树状结构
    this.return = null;
    this.sibling = null;
    this.child = null;
    // 兄弟节点的位置
    this.index = 0;

    this.ref = null;

    // 工作单元需要用到的数据
    this.pendingProps = pendingProps;
    this.memoizedProps = null;

    // current 和 workInProgress 互相切换
    this.alternate = null;
    // 副作用，标记节点的增删改
    this.flags = NoFlags;
  }
}
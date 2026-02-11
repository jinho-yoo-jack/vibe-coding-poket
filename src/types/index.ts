// 모든 타입을 재내보내기
export * from './pokemon';

// 유틸리티 타입들
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// 컴포넌트 Props를 위한 기본 타입
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
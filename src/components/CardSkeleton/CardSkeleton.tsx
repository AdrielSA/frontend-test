import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonWrapper = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const SkeletonElement = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 2000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 4px;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '16px'};
  margin-bottom: 12px;
`;

const SkeletonRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export function CardSkeleton() {
  return (
    <SkeletonWrapper>
      <SkeletonElement width="70%" height="20px" />
      <SkeletonElement width="100%" height="14px" />
      <SkeletonElement width="100%" height="14px" />
      <SkeletonRow>
        <SkeletonElement width="60px" height="24px" />
        <SkeletonElement width="100px" height="14px" />
      </SkeletonRow>
      <SkeletonElement width="80px" height="14px" />
    </SkeletonWrapper>
  );
}

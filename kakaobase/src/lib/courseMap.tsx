export const courseMap: Record<string, string> = {
  '클라우드 네이티브 제주 1기': 'JEJU_1',
  '클라우드 네이티브 제주 2기': 'JEJU_2',
  '카카오테크 부트캠프 1기': 'PANGYO_1',
  '카카오테크 부트캠프 2기': 'PANGYO_2',
  '기타 사용자': 'ALL',
};

export const courseMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(courseMap).map(([key, value]) => [value, key])
);

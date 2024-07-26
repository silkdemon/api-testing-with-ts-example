export interface ApiListResponseDto {
  data: {
    id: string;
    name: string;
  }[];
}

export interface ApiCreateRequestDto {
  name: string;
  id: string;
}

export interface ApiCreateResponseDto {
  id: string;
  name: string;
  status: string;
}

export interface ApiDeleteResponseDto {
  id: string;
  status: string;
}

export interface ApiGetResponseDto {
  id: string;
  info: string;
  status: string;
}

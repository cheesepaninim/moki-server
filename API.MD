# API 연동 명세서
1. [사용자](#사용자)
    1. 회원가입
    2. 개인정보수정
    3. 탈퇴
    4. 로그인
    5. 로그아웃
    6. 게시글목록
    7. 게시글
        
2. [게시글](#게시글)
    1. 업로드
    2. 수정
    3. 삭제
    4. 좋아요
    
3. [메인 화면](#메인-화면)
    1. like 순위
    2. link 순위

--- --- 

### #사용자
|기능|Method|url|
|:---|---:|:---|
|회원가입|`POST`|**/user/auth/create**|
|개인정보수정|`PATCH`|**/user/auth/update**|
|탈퇴|`DELETE`|**/user/auth/delete**|
|로그인|`POST`|**/user/auth/signin**|
|로그아웃|`POST`|**/user/auth/signout**|

||||
|:---|---:|:---|
|사용자메인|`GET`|**/user, [user_id]**|  
|게시글목록|`GET`|**/user/board, [user_id]**|  
|게시글|`GET`|**/user/board/[board_id]**|  

### #게시글
|기능|Method|url|
|:---|---:|:---|
|업로드|`POST`|**/board/create, [{...}]**|
|수정|`PATCH`|**/board/update, [board_id]**|
|삭제|`DELETE`|**/board/delete, [board_id]**|
|좋아요|`POST`|**/board/like, [board_id]**|
 
### #메인 화면
|기능|Method|url|
|:---|---:|:---|
|like 순위|`GET`|...|
|link 순위|`GET`|...| 


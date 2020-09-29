# API 연동 명세서
1. [사용자](#사용자)
    1. 회원가입
    2. 개인정보수정
    3. 탈퇴
    4. 로그인
    5. 로그아웃
    6. 사용자메인
    7. 게시글목록
        
2. [게시글](#게시글)
    1. 업로드
    2. 게시글
    3. 수정
    4. 삭제
    5. 좋아요
    
3. [메인 화면](#메인-화면)
    1. like 순위
    2. link 순위

--- --- 

### #사용자
|기능|Method|Endpoint|Params|
|:---|---:|:---|:---|
|회원가입|`POST`|**/user**||
|개인정보수정|`PATCH`|**/user/[user_id]**||
|탈퇴|`DELETE`|**/user/[user_id]**||
|로그인|`POST`|**/user/signin**|{user_id, user_pwd}|
|로그아웃|`POST`|**/user/auth/signout**|..|
****
|||||
|:---|---:|:---|:---|
|사용자메인|`GET`|**/user/[user_id]**|..|
|게시글목록|`GET`|**/user/board**|{user_id}|

### #게시글
|기능|Method|Endpoint|Params|
|:---|---:|:---|:---|  
|업로드|`POST`|**/board**|{user_id, ...}|
|조회|`GET`|**/board/[board_id]**|
|수정|`PATCH`|**/board/[board_id]**|{user_id, ...}|
|삭제|`DELETE`|**/board/[board_id]**|{user_id}|
|좋아요|`POST`|**/board/[board_id]/like**||
 
### #메인 화면
|기능|Method|Endpoint|Params|
|:---|---:|:---|:---|
|like 순위|`GET`|...|
|link 순위|`GET`|...| 

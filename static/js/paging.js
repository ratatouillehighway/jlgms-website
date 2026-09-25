/**
 * 페이징 처리용 js
 * 24-02-29
 */
    // 페이지 이동
    function movePage(page) {

        // 이벤트를 통해 전달받는 page(페이지 번호)를 기준으로 객체 생성
        const queryParams = {
            page: (page) ? page : 1,
            recordSize: 8,
            pageSize: 10
        }

        location.href = location.pathname + '?' + new URLSearchParams(queryParams).toString();
    }

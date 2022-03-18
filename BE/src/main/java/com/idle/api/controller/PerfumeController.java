/**
* PerfumeController
* 향수 검색 API 구현
*
* @author Woody, David
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/16
**/
package com.idle.api.controller;

import com.idle.api.response.PerfumeListRes;
import com.idle.api.response.PerfumeListResponse;
import com.idle.api.service.PerfumeService;
import com.idle.db.entity.Perfume;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@Api(value = "향수 API", tags = {"Perfume"})
@RestController
@RequestMapping("/perfume")
public class PerfumeController {

    @Autowired
    private PerfumeService perfumeService;

    /* David  */
    @ApiOperation("향수 목록 조회")
    @GetMapping("/list")
    public ResponseEntity<PerfumeListResponse> getPerfumeList(Pageable pageable) {
        Page<Perfume> perfumes =  perfumeService.getPerfumeList(pageable);
        return ResponseEntity.ok(PerfumeListResponse.of(200,"Success",perfumes));
    }

    /* Woody */
    @ApiOperation("향수 검색")
    @GetMapping("/search")
    public ResponseEntity<PerfumeListRes> perfumeSearchList(@RequestParam(value = "keyword") String keyword,
                                                          @RequestParam(value = "content") String content,
                                                          @PageableDefault(size=4, sort = "perfumeName", direction = Sort.Direction.ASC) Pageable pageable) {
        Map<String,Object> map = perfumeService.getPerfumeSearchPage(keyword, content, pageable);
        return ResponseEntity.status(200).body(PerfumeListRes.of(200, "Success", (List<Perfume>) map.get("perfumeList"), (Boolean) map.get("isLast")));
    }
}

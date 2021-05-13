package kz.crtr.controller;

import io.swagger.annotations.ApiOperation;
import kz.crtr.service.AppService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping(value = "/open-api/app", produces = MediaType.APPLICATION_JSON_VALUE)
public class AppRestController {

    private final AppService appService;

    @ApiOperation(value = "список доступных систем юзеру")
    @GetMapping("/getSystemList")
    public ResponseEntity<?> getSystemList() {
        return ResponseEntity.ok(appService.getSystemList());
    }

    @ApiOperation(value = "список доступных систем Ввиде Page")
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(appService.getAll());
    }
}

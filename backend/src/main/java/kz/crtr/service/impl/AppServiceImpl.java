package kz.crtr.service.impl;

import kz.crtr.dto.SystemDto;
import kz.crtr.service.AppService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class AppServiceImpl implements AppService {

    @Override
    public List<?> getSystemList() {
        List<SystemDto> systemDtoList = new ArrayList<>();
        List<String> list = List.of("E-Макет", "ЦБД", "ООП");
        for (String s : list) {
            systemDtoList.add(SystemDto.builder()
                    .description(s)
                    .name(s)
                    .build());
        }
        return systemDtoList;
    }

    @Override
    public List<?> getAll() {
        List<SystemDto> systemDtoList = new ArrayList<>();
        List<String> list = List.of("E-Макет", "ЦБД", "ООП");
        int i = 0;
        for (String s : list) {
            i++;
            systemDtoList.add(SystemDto.builder()
                    .id(Long.parseLong(String.valueOf(i)))
                    .description(s)
                    .name(s)
                    .build());
        }
        return systemDtoList;
    }
}

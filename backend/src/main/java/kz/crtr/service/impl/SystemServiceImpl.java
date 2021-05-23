package kz.crtr.service.impl;

import kz.crtr.dto.SystemDto;
import kz.crtr.models.Systems;
import kz.crtr.models.User;
import kz.crtr.models.repository.SystemsRepository;
import kz.crtr.service.SystemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class SystemServiceImpl implements SystemService {

    private final SystemsRepository systemsRepository;

    @Override
    public void addSystem(SystemDto dto) {
        modifySystems(dto, new Systems());
    }

    private void modifySystems(SystemDto dto, Systems systems) {
        systems.setName(dto.getName());
        systems.setDescription(dto.getDescription());
        systems.setCreateBy(new User());//TODO
        systems.setCreateDate(ZonedDateTime.now());
        systems.setModifyBy(new User());
        systems.setModifyDate(ZonedDateTime.now());
        systemsRepository.save(systems);
    }

    @Override
    public void editSystem(Long systemId, SystemDto dto) {
        Optional<Systems> optional = systemsRepository.findById(systemId);
        optional.ifPresent(system -> {
            modifySystems(dto, system);
        });
    }


    @Override
    public void removeSystem(Long id) {
        Optional<Systems> optional = systemsRepository.findById(id);
        optional.ifPresent(system -> {
            system.setDeleted(Boolean.TRUE);
            systemsRepository.save(system);
        });
    }

    @Override
    public List<SystemDto> getSystemList() {
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
    public List<SystemDto> getAll() {
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

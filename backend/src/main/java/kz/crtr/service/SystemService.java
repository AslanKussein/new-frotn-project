package kz.crtr.service;


import kz.crtr.dto.SystemDto;

import java.util.List;

public interface SystemService {
    List<SystemDto> getSystemList();

    List<SystemDto> getAll();

    void addSystem(SystemDto dto);

    void editSystem(Long systemId, SystemDto dto);

    void removeSystem(Long id);
}

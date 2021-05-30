package kz.crtr.controller.token;

import io.swagger.annotations.ApiParam;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
public class LoginRequestDto {
    @Valid
    @NotNull
    @ApiParam(example = "ADMIN01")
    private String username;
    @Valid
    @NotNull
    private String password;
}

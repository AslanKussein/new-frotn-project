package kz.crtr.controller.token;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kz.crtr.dto.ErrorDto;
import kz.crtr.dto.UserTokenState;
import kz.crtr.security.CurrentUser;
import kz.crtr.security.UserDetailsServiceImpl;
import kz.crtr.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Objects.isNull;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping(value = "/open-api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class SignRestController {

    private final JwtTokenUtil tokenUtil;
    private final UserDetailsServiceImpl userDetailsService;
    private final AuthenticationManager authenticationManager;

    @ApiOperation(value = "", notes = "authorize and generate token", response = UserTokenState.class, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = UserTokenState.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = UserTokenState.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
    @PostMapping("/login")
    public ResponseEntity<UserTokenState> login(@RequestBody final LoginRequestDto loginRequest) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        if (isNull(userDetails)) {
            throw new UsernameNotFoundException("User not exist with name :" + loginRequest.getUsername());
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();

        UserTokenState jwt = tokenUtil.generateToken(currentUser.getUser().getEmpId().toString(), currentUser.getUser().getUsername());

        return ResponseEntity.ok(jwt);
    }

    @ApiOperation(value = "", notes = "update expired token using resfresh token", response = UserTokenState.class, tags = {})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = UserTokenState.class),
            @ApiResponse(code = 400, message = "Refresh token not correct", response = ErrorDto.class)})
    @PostMapping("/refreshToken")
    public ResponseEntity<UserTokenState> refreshToken(@RequestBody final RefreshTokenRequestDto dto) {
        try {
            UserTokenState userTokenState = tokenUtil.generateToken(tokenUtil.getUserIdFromJWT(dto.getRefreshToken()), tokenUtil.getUserName(dto.getRefreshToken()));
            return ResponseEntity.ok(userTokenState);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

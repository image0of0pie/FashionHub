package com.assignment.fashionHub.security;

import com.assignment.fashionHub.Services.CustomLogoutHandler;
import com.assignment.fashionHub.auth.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

import javax.sql.DataSource;

import static com.assignment.fashionHub.Models.AppUserRole.*;
import static com.assignment.fashionHub.Models.AppUserRole.ADMIN;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final AppUserService appUserService;

    @Autowired
    RestAuthEntryPoint restAuthEntryPoint;

    @Autowired
    DataSource dataSource;

    @Autowired
    private CustomLogoutHandler logoutHandler;

    @Autowired
    public WebSecurityConfig(PasswordEncoder passwordEncoder, AppUserService appUserService) {
        this.passwordEncoder = passwordEncoder;
        this.appUserService = appUserService;
    }

    @Override
    public void configure(WebSecurity registry) throws Exception {
        registry.ignoring()
                .antMatchers("/docs/**")
                .antMatchers("/actuator/**")
                .antMatchers("/swagger-ui.html")
                .antMatchers("/webjars/**");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());

    }



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
                csrf().disable()
                .authorizeRequests()
                .antMatchers("/","/static/**", "index*", "/css/*", "/js/*","/media/*","*.ico","*.png").permitAll()
                .antMatchers("/api/register").permitAll()
                .antMatchers("/api/auth").permitAll()
                .antMatchers("/api/persist/**").authenticated()

                .antMatchers("/api/v1/**").authenticated()
                .antMatchers("/admin/api/**").hasRole(ADMIN.name())
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(restAuthEntryPoint)
                .and()
                .formLogin()
                    .loginProcessingUrl("/api/login")
                    .permitAll()
                .and()
                .logout()
                .logoutUrl("/api/logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .clearAuthentication(true)
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
                .and().headers()
                .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin", "*"));
    }




    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(appUserService);
        return provider;
    }
}

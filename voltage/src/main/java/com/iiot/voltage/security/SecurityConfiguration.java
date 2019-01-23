package com.iiot.voltage.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

//    @Autowired
//    @Qualifier("customUserDetailsService")
//    UserDetailsService userDetailsService;



    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        //1.Default Memory Authentication Provider
        auth
                .inMemoryAuthentication()
                .withUser("mqs").password("{noop}mqs").roles("USER");



    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()

                .antMatchers(
                        "/resources/**",
                        "/resources/scripts/**",
                        "/resources/scripts/bootstrap.min.js",
                        "/resources/scripts/jquery-3.3.1.min.js",
                        "/resources/scripts/util/**",
                        "/resources/scripts/util/AjaxUtil.js",

                        "/resources/scripts/util/bootstrap-paginator.js",
                        "/resources/scripts/util/pagingUtil.js"

                ).permitAll()
                .anyRequest().authenticated()
                .and()
                 .formLogin().loginPage("/login").loginProcessingUrl("/j_spring_security_check").usernameParameter("j_username").passwordParameter("j_password").successHandler(getAuthenticationSuccessHandler())
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .permitAll();
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        SessionRegistry sessionRegistry = new SessionRegistryImpl();
        return sessionRegistry;
    }

    @Bean
    public CustomAuthenticationEntryPoint getAuthenticationEntryPoint() {
        CustomAuthenticationEntryPoint authenticationEntryPoint = new CustomAuthenticationEntryPoint();
        authenticationEntryPoint.setLoginPageUrl("/login");
        authenticationEntryPoint.setReturnParameterEnabled(true);
        authenticationEntryPoint.setReturnParameterName("r");

        return authenticationEntryPoint;
    }

    @Bean
    public CustomAuthenticationSuccessHandler getAuthenticationSuccessHandler() {
        CustomAuthenticationSuccessHandler authenticationHandler = new CustomAuthenticationSuccessHandler();
        authenticationHandler.setDefaultTargetUrl("/menu");
        authenticationHandler.setTargetUrlParameter("spring-security-redirect");

        return authenticationHandler;
    }


}

package com.mycompany.myapp.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.mycompany.myapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Product.class.getName() + ".orderedProducts", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.ImageToken.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.UserOrder.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Custumer.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Custumer.class.getName() + ".custumerOrders", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.ProductCategory.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.ProductCategory.class.getName() + ".categoryProducts", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.SlidePage.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}

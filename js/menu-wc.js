'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">schulcloud-server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/nestjs-application.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-6c9c42e30cd6b8d60fdff2ecc91e88cd862077ada8a1f35cac276997dbfd2ac96efe1207f4762c4df4900fb7f5417aa723e20c1b8800a02c8405f9d1a29d9196"' : 'data-target="#xs-additional-page-6c9c42e30cd6b8d60fdff2ecc91e88cd862077ada8a1f35cac276997dbfd2ac96efe1207f4762c4df4900fb7f5417aa723e20c1b8800a02c8405f9d1a29d9196"' }>
                                                <span class="link-name">NestJS Application</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-6c9c42e30cd6b8d60fdff2ecc91e88cd862077ada8a1f35cac276997dbfd2ac96efe1207f4762c4df4900fb7f5417aa723e20c1b8800a02c8405f9d1a29d9196"' : 'id="xs-additional-page-6c9c42e30cd6b8d60fdff2ecc91e88cd862077ada8a1f35cac276997dbfd2ac96efe1207f4762c4df4900fb7f5417aa723e20c1b8800a02c8405f9d1a29d9196"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/software-architecture.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Software Architecture</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/architecture-mapping-to-code.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Architecture Mapping to Code</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/domain-driven-design.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Domain driven design</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/cross-cutting-concerns.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Cross-cutting concerns</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/testing.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Testing</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/decisions.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Decisions</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/vscode.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">VSCode</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/git.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Git</a>
                                            </li>
                                        </ul>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-6a9c36bb680726a2da1515a0ddf79a915831b3695e822f7767874dc305fa150e7ba3ec2d134be192f5d1609f40176b91605f2174363f54a18db4fbc479525d7d"' : 'data-target="#xs-injectables-links-module-AuthModule-6a9c36bb680726a2da1515a0ddf79a915831b3695e822f7767874dc305fa150e7ba3ec2d134be192f5d1609f40176b91605f2174363f54a18db4fbc479525d7d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6a9c36bb680726a2da1515a0ddf79a915831b3695e822f7767874dc305fa150e7ba3ec2d134be192f5d1609f40176b91605f2174363f54a18db4fbc479525d7d"' :
                                        'id="xs-injectables-links-module-AuthModule-6a9c36bb680726a2da1515a0ddf79a915831b3695e822f7767874dc305fa150e7ba3ec2d134be192f5d1609f40176b91605f2174363f54a18db4fbc479525d7d"' }>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtValidationAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtValidationAdapter</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthorizationModule.html" data-type="entity-link" >AuthorizationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthorizationModule-437c99382b0dc286a7ddec014e0ef2401b0fb1ea79d70f05a3c5f49287c33bc9701845445772ff7e5c2a1a4c43e299900e4753864a153aa3be4f29417d19c80f"' : 'data-target="#xs-injectables-links-module-AuthorizationModule-437c99382b0dc286a7ddec014e0ef2401b0fb1ea79d70f05a3c5f49287c33bc9701845445772ff7e5c2a1a4c43e299900e4753864a153aa3be4f29417d19c80f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthorizationModule-437c99382b0dc286a7ddec014e0ef2401b0fb1ea79d70f05a3c5f49287c33bc9701845445772ff7e5c2a1a4c43e299900e4753864a153aa3be4f29417d19c80f"' :
                                        'id="xs-injectables-links-module-AuthorizationModule-437c99382b0dc286a7ddec014e0ef2401b0fb1ea79d70f05a3c5f49287c33bc9701845445772ff7e5c2a1a4c43e299900e4753864a153aa3be4f29417d19c80f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthorizationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthorizationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FeathersAuthProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeathersAuthProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConsoleWriterModule.html" data-type="entity-link" >ConsoleWriterModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ConsoleWriterModule-fde97a53bb9fb961eae116b90895a61fa3a1626cbd313c46afd0e7d39bb580eabc8b3829ec9b7f49c6cd7d2d2895f2c805b14da32cd5d58c6ca7ddeed2453cff"' : 'data-target="#xs-injectables-links-module-ConsoleWriterModule-fde97a53bb9fb961eae116b90895a61fa3a1626cbd313c46afd0e7d39bb580eabc8b3829ec9b7f49c6cd7d2d2895f2c805b14da32cd5d58c6ca7ddeed2453cff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConsoleWriterModule-fde97a53bb9fb961eae116b90895a61fa3a1626cbd313c46afd0e7d39bb580eabc8b3829ec9b7f49c6cd7d2d2895f2c805b14da32cd5d58c6ca7ddeed2453cff"' :
                                        'id="xs-injectables-links-module-ConsoleWriterModule-fde97a53bb9fb961eae116b90895a61fa3a1626cbd313c46afd0e7d39bb580eabc8b3829ec9b7f49c6cd7d2d2895f2c805b14da32cd5d58c6ca7ddeed2453cff"' }>
                                        <li class="link">
                                            <a href="injectables/ConsoleWriterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConsoleWriterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseManagementModule.html" data-type="entity-link" >DatabaseManagementModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EncryptionModule.html" data-type="entity-link" >EncryptionModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorModule.html" data-type="entity-link" >ErrorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FeathersModule.html" data-type="entity-link" >FeathersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FeathersModule-a01f88efe2cd09af000654f38947283900ddac7015c58d6a0c1d84ff7e78481e550d90fd231dd162472ced92d905c2b449829eb5bd39bdda0620dd285d9c5a9a"' : 'data-target="#xs-injectables-links-module-FeathersModule-a01f88efe2cd09af000654f38947283900ddac7015c58d6a0c1d84ff7e78481e550d90fd231dd162472ced92d905c2b449829eb5bd39bdda0620dd285d9c5a9a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FeathersModule-a01f88efe2cd09af000654f38947283900ddac7015c58d6a0c1d84ff7e78481e550d90fd231dd162472ced92d905c2b449829eb5bd39bdda0620dd285d9c5a9a"' :
                                        'id="xs-injectables-links-module-FeathersModule-a01f88efe2cd09af000654f38947283900ddac7015c58d6a0c1d84ff7e78481e550d90fd231dd162472ced92d905c2b449829eb5bd39bdda0620dd285d9c5a9a"' }>
                                        <li class="link">
                                            <a href="injectables/FeathersServiceProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeathersServiceProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesModule-180021cb7b654d57a9e07f90ed90040e80e56736eadc959e0d60c84ae8ad7a37d685dc048b880237261d8f4119d2f882be1ff726fdda91e9fd83cae460d84f1e"' : 'data-target="#xs-injectables-links-module-FilesModule-180021cb7b654d57a9e07f90ed90040e80e56736eadc959e0d60c84ae8ad7a37d685dc048b880237261d8f4119d2f882be1ff726fdda91e9fd83cae460d84f1e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-180021cb7b654d57a9e07f90ed90040e80e56736eadc959e0d60c84ae8ad7a37d685dc048b880237261d8f4119d2f882be1ff726fdda91e9fd83cae460d84f1e"' :
                                        'id="xs-injectables-links-module-FilesModule-180021cb7b654d57a9e07f90ed90040e80e56736eadc959e0d60c84ae8ad7a37d685dc048b880237261d8f4119d2f882be1ff726fdda91e9fd83cae460d84f1e"' }>
                                        <li class="link">
                                            <a href="injectables/DeleteFilesUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteFilesUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileStorageAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileStorageAdapter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StorageProviderRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageProviderRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileSystemModule.html" data-type="entity-link" >FileSystemModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FileSystemModule-ae142627e864d1e4e80b5d3b89718a3b1972140905e47e98979921d2e55e7770ca712a81c31830c66e9932f6244de5d5954232e4d44722f0da77594300c0c823"' : 'data-target="#xs-injectables-links-module-FileSystemModule-ae142627e864d1e4e80b5d3b89718a3b1972140905e47e98979921d2e55e7770ca712a81c31830c66e9932f6244de5d5954232e4d44722f0da77594300c0c823"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileSystemModule-ae142627e864d1e4e80b5d3b89718a3b1972140905e47e98979921d2e55e7770ca712a81c31830c66e9932f6244de5d5954232e4d44722f0da77594300c0c823"' :
                                        'id="xs-injectables-links-module-FileSystemModule-ae142627e864d1e4e80b5d3b89718a3b1972140905e47e98979921d2e55e7770ca712a81c31830c66e9932f6244de5d5954232e4d44722f0da77594300c0c823"' }>
                                        <li class="link">
                                            <a href="injectables/FileSystemAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileSystemAdapter</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InterceptorModule.html" data-type="entity-link" >InterceptorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LearnroomModule.html" data-type="entity-link" >LearnroomModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LearnroomModule-f487244ff34a1a3ecb7814ffe928736ae33bc4b659e30c48bfce48ed53a242bda4cbe17472f8ef23f3a7684f1d49ca55d8ae7f0350c2d5f057320eb88c6845b6"' : 'data-target="#xs-controllers-links-module-LearnroomModule-f487244ff34a1a3ecb7814ffe928736ae33bc4b659e30c48bfce48ed53a242bda4cbe17472f8ef23f3a7684f1d49ca55d8ae7f0350c2d5f057320eb88c6845b6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LearnroomModule-f487244ff34a1a3ecb7814ffe928736ae33bc4b659e30c48bfce48ed53a242bda4cbe17472f8ef23f3a7684f1d49ca55d8ae7f0350c2d5f057320eb88c6845b6"' :
                                            'id="xs-controllers-links-module-LearnroomModule-f487244ff34a1a3ecb7814ffe928736ae33bc4b659e30c48bfce48ed53a242bda4cbe17472f8ef23f3a7684f1d49ca55d8ae7f0350c2d5f057320eb88c6845b6"' }>
                                            <li class="link">
                                                <a href="controllers/CourseController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/DashboardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LearnroomModule-f487244ff34a1a3ecb7814ffe928736ae33bc4b659e30c48bfce48ed53a242bda4cbe17472f8ef23f3a7684f1d49ca55d8ae7f0350c2d5f057320eb88c6845b6"' : 'data-target="#xs-injectables-links-module-LearnroomModule-f487244ff34a1a3ecb7814ffe928736ae33bc4b659e30c48bfce48ed53a242bda4cbe17472f8ef23f3a7684f1d49ca55d8ae7f0350c2d5f057320eb88c6845b6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LearnroomModule-f487244ff34a1a3ecb7814ffe928736ae33bc4b659e30c48bfce48ed53a242bda4cbe17472f8ef23f3a7684f1d49ca55d8ae7f0350c2d5f057320eb88c6845b6"' :
                                        'id="xs-injectables-links-module-LearnroomModule-f487244ff34a1a3ecb7814ffe928736ae33bc4b659e30c48bfce48ed53a242bda4cbe17472f8ef23f3a7684f1d49ca55d8ae7f0350c2d5f057320eb88c6845b6"' }>
                                        <li class="link">
                                            <a href="injectables/CourseRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DashboardModelMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardModelMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DashboardUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardUc</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoggerModule-cc3d0946650fae4ae35462794a7e700afe604c284c53c8512d9a0a215a917940e7bfbe506d991595a80c17045cd413a9df5d13b987ed2afffa3ddb0bd001091b"' : 'data-target="#xs-injectables-links-module-LoggerModule-cc3d0946650fae4ae35462794a7e700afe604c284c53c8512d9a0a215a917940e7bfbe506d991595a80c17045cd413a9df5d13b987ed2afffa3ddb0bd001091b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-cc3d0946650fae4ae35462794a7e700afe604c284c53c8512d9a0a215a917940e7bfbe506d991595a80c17045cd413a9df5d13b987ed2afffa3ddb0bd001091b"' :
                                        'id="xs-injectables-links-module-LoggerModule-cc3d0946650fae4ae35462794a7e700afe604c284c53c8512d9a0a215a917940e7bfbe506d991595a80c17045cd413a9df5d13b987ed2afffa3ddb0bd001091b"' }>
                                        <li class="link">
                                            <a href="injectables/Logger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Logger</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ManagementModule.html" data-type="entity-link" >ManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ManagementModule-eaa94fcb44f8132ea359a9c5a259d016679984d5477e30f83b076e8fb540f9aee94f7f5be8ad131d575333f7091eae5e39cca85afe8b561d60823dddb604f10c"' : 'data-target="#xs-controllers-links-module-ManagementModule-eaa94fcb44f8132ea359a9c5a259d016679984d5477e30f83b076e8fb540f9aee94f7f5be8ad131d575333f7091eae5e39cca85afe8b561d60823dddb604f10c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ManagementModule-eaa94fcb44f8132ea359a9c5a259d016679984d5477e30f83b076e8fb540f9aee94f7f5be8ad131d575333f7091eae5e39cca85afe8b561d60823dddb604f10c"' :
                                            'id="xs-controllers-links-module-ManagementModule-eaa94fcb44f8132ea359a9c5a259d016679984d5477e30f83b076e8fb540f9aee94f7f5be8ad131d575333f7091eae5e39cca85afe8b561d60823dddb604f10c"' }>
                                            <li class="link">
                                                <a href="controllers/DatabaseManagementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseManagementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ManagementModule-eaa94fcb44f8132ea359a9c5a259d016679984d5477e30f83b076e8fb540f9aee94f7f5be8ad131d575333f7091eae5e39cca85afe8b561d60823dddb604f10c"' : 'data-target="#xs-injectables-links-module-ManagementModule-eaa94fcb44f8132ea359a9c5a259d016679984d5477e30f83b076e8fb540f9aee94f7f5be8ad131d575333f7091eae5e39cca85afe8b561d60823dddb604f10c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManagementModule-eaa94fcb44f8132ea359a9c5a259d016679984d5477e30f83b076e8fb540f9aee94f7f5be8ad131d575333f7091eae5e39cca85afe8b561d60823dddb604f10c"' :
                                        'id="xs-injectables-links-module-ManagementModule-eaa94fcb44f8132ea359a9c5a259d016679984d5477e30f83b076e8fb540f9aee94f7f5be8ad131d575333f7091eae5e39cca85afe8b561d60823dddb604f10c"' }>
                                        <li class="link">
                                            <a href="injectables/BsonConverter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsonConverter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ConsoleWriterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConsoleWriterService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DatabaseManagementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseManagementService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DatabaseManagementUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseManagementUc</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MongoMemoryDatabaseModule.html" data-type="entity-link" >MongoMemoryDatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewsModule.html" data-type="entity-link" >NewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-NewsModule-c7a4d61931dead4d214e8d438280ad9b003c3d28c18813e1acf4a10b010b95c9fc0e1c854ffd6658923ca9b3ddd31aee72fe595bff41794e08a46a69b00212bd"' : 'data-target="#xs-controllers-links-module-NewsModule-c7a4d61931dead4d214e8d438280ad9b003c3d28c18813e1acf4a10b010b95c9fc0e1c854ffd6658923ca9b3ddd31aee72fe595bff41794e08a46a69b00212bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NewsModule-c7a4d61931dead4d214e8d438280ad9b003c3d28c18813e1acf4a10b010b95c9fc0e1c854ffd6658923ca9b3ddd31aee72fe595bff41794e08a46a69b00212bd"' :
                                            'id="xs-controllers-links-module-NewsModule-c7a4d61931dead4d214e8d438280ad9b003c3d28c18813e1acf4a10b010b95c9fc0e1c854ffd6658923ca9b3ddd31aee72fe595bff41794e08a46a69b00212bd"' }>
                                            <li class="link">
                                                <a href="controllers/NewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TeamNewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamNewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NewsModule-c7a4d61931dead4d214e8d438280ad9b003c3d28c18813e1acf4a10b010b95c9fc0e1c854ffd6658923ca9b3ddd31aee72fe595bff41794e08a46a69b00212bd"' : 'data-target="#xs-injectables-links-module-NewsModule-c7a4d61931dead4d214e8d438280ad9b003c3d28c18813e1acf4a10b010b95c9fc0e1c854ffd6658923ca9b3ddd31aee72fe595bff41794e08a46a69b00212bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NewsModule-c7a4d61931dead4d214e8d438280ad9b003c3d28c18813e1acf4a10b010b95c9fc0e1c854ffd6658923ca9b3ddd31aee72fe595bff41794e08a46a69b00212bd"' :
                                        'id="xs-injectables-links-module-NewsModule-c7a4d61931dead4d214e8d438280ad9b003c3d28c18813e1acf4a10b010b95c9fc0e1c854ffd6658923ca9b3ddd31aee72fe595bff41794e08a46a69b00212bd"' }>
                                        <li class="link">
                                            <a href="injectables/NewsRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NewsUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsUc</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RocketChatModule.html" data-type="entity-link" >RocketChatModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServerConsoleModule.html" data-type="entity-link" >ServerConsoleModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServerModule.html" data-type="entity-link" >ServerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ServerModule-6588079a8c2c1e51b75060edccc592595659c1497ac87bf417eecf15f53951e52de1d2fc4b1f8e014dbc8eef9c2835b87818edb365edee7a55b8fdcc92ebf521"' : 'data-target="#xs-controllers-links-module-ServerModule-6588079a8c2c1e51b75060edccc592595659c1497ac87bf417eecf15f53951e52de1d2fc4b1f8e014dbc8eef9c2835b87818edb365edee7a55b8fdcc92ebf521"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServerModule-6588079a8c2c1e51b75060edccc592595659c1497ac87bf417eecf15f53951e52de1d2fc4b1f8e014dbc8eef9c2835b87818edb365edee7a55b8fdcc92ebf521"' :
                                            'id="xs-controllers-links-module-ServerModule-6588079a8c2c1e51b75060edccc592595659c1497ac87bf417eecf15f53951e52de1d2fc4b1f8e014dbc8eef9c2835b87818edb365edee7a55b8fdcc92ebf521"' }>
                                            <li class="link">
                                                <a href="controllers/ServerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServerController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TaskModule-9317dce671ead0cbc133f19bc34df750024c000383754965ec395571c2969b365a2c99cc19ec0f244b92bbd041e8ed308e8cc52b4436f740b8f056d845988c8d"' : 'data-target="#xs-controllers-links-module-TaskModule-9317dce671ead0cbc133f19bc34df750024c000383754965ec395571c2969b365a2c99cc19ec0f244b92bbd041e8ed308e8cc52b4436f740b8f056d845988c8d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-9317dce671ead0cbc133f19bc34df750024c000383754965ec395571c2969b365a2c99cc19ec0f244b92bbd041e8ed308e8cc52b4436f740b8f056d845988c8d"' :
                                            'id="xs-controllers-links-module-TaskModule-9317dce671ead0cbc133f19bc34df750024c000383754965ec395571c2969b365a2c99cc19ec0f244b92bbd041e8ed308e8cc52b4436f740b8f056d845988c8d"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TaskModule-9317dce671ead0cbc133f19bc34df750024c000383754965ec395571c2969b365a2c99cc19ec0f244b92bbd041e8ed308e8cc52b4436f740b8f056d845988c8d"' : 'data-target="#xs-injectables-links-module-TaskModule-9317dce671ead0cbc133f19bc34df750024c000383754965ec395571c2969b365a2c99cc19ec0f244b92bbd041e8ed308e8cc52b4436f740b8f056d845988c8d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-9317dce671ead0cbc133f19bc34df750024c000383754965ec395571c2969b365a2c99cc19ec0f244b92bbd041e8ed308e8cc52b4436f740b8f056d845988c8d"' :
                                        'id="xs-injectables-links-module-TaskModule-9317dce671ead0cbc133f19bc34df750024c000383754965ec395571c2969b365a2c99cc19ec0f244b92bbd041e8ed308e8cc52b4436f740b8f056d845988c8d"' }>
                                        <li class="link">
                                            <a href="injectables/CourseRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LessonRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskAuthorizationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskAuthorizationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskUC</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-4a74b034bc4c364993fff98321c2e5f792906cdfb756c224bbdd48f6760c5605528509eb221a8fbce75ee6ee267f283e94573492e0f7a7c8aa1834dfb1bd4b62"' : 'data-target="#xs-controllers-links-module-UserModule-4a74b034bc4c364993fff98321c2e5f792906cdfb756c224bbdd48f6760c5605528509eb221a8fbce75ee6ee267f283e94573492e0f7a7c8aa1834dfb1bd4b62"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-4a74b034bc4c364993fff98321c2e5f792906cdfb756c224bbdd48f6760c5605528509eb221a8fbce75ee6ee267f283e94573492e0f7a7c8aa1834dfb1bd4b62"' :
                                            'id="xs-controllers-links-module-UserModule-4a74b034bc4c364993fff98321c2e5f792906cdfb756c224bbdd48f6760c5605528509eb221a8fbce75ee6ee267f283e94573492e0f7a7c8aa1834dfb1bd4b62"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-4a74b034bc4c364993fff98321c2e5f792906cdfb756c224bbdd48f6760c5605528509eb221a8fbce75ee6ee267f283e94573492e0f7a7c8aa1834dfb1bd4b62"' : 'data-target="#xs-injectables-links-module-UserModule-4a74b034bc4c364993fff98321c2e5f792906cdfb756c224bbdd48f6760c5605528509eb221a8fbce75ee6ee267f283e94573492e0f7a7c8aa1834dfb1bd4b62"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-4a74b034bc4c364993fff98321c2e5f792906cdfb756c224bbdd48f6760c5605528509eb221a8fbce75ee6ee267f283e94573492e0f7a7c8aa1834dfb1bd4b62"' :
                                        'id="xs-injectables-links-module-UserModule-4a74b034bc4c364993fff98321c2e5f792906cdfb756c224bbdd48f6760c5605528509eb221a8fbce75ee6ee267f283e94573492e0f7a7c8aa1834dfb1bd4b62"' }>
                                        <li class="link">
                                            <a href="injectables/RoleRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleUC</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserUC</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ValidationModule.html" data-type="entity-link" >ValidationModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/DelayController.html" data-type="entity-link" >DelayController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiValidationError.html" data-type="entity-link" >ApiValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiValidationErrorResponse.html" data-type="entity-link" >ApiValidationErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntityWithTimestamps.html" data-type="entity-link" >BaseEntityWithTimestamps</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseFactory.html" data-type="entity-link" >BaseFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseFile.html" data-type="entity-link" >BaseFile</a>
                            </li>
                            <li class="link">
                                <a href="classes/BusinessError.html" data-type="entity-link" >BusinessError</a>
                            </li>
                            <li class="link">
                                <a href="classes/Course.html" data-type="entity-link" >Course</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseFactory.html" data-type="entity-link" >CourseFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseGroup.html" data-type="entity-link" >CourseGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseMapper.html" data-type="entity-link" >CourseMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseMetadataListResponse.html" data-type="entity-link" >CourseMetadataListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseMetadataResponse.html" data-type="entity-link" >CourseMetadataResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseNews.html" data-type="entity-link" >CourseNews</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseScope.html" data-type="entity-link" >CourseScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNewsParams.html" data-type="entity-link" >CreateNewsParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardEntity.html" data-type="entity-link" >DashboardEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardGridElementModel.html" data-type="entity-link" >DashboardGridElementModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardGridElementResponse.html" data-type="entity-link" >DashboardGridElementResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardGridSubElementResponse.html" data-type="entity-link" >DashboardGridSubElementResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardMapper.html" data-type="entity-link" >DashboardMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardModelEntity.html" data-type="entity-link" >DashboardModelEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardResponse.html" data-type="entity-link" >DashboardResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseManagementConsole.html" data-type="entity-link" >DatabaseManagementConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteFilesConsole.html" data-type="entity-link" >DeleteFilesConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/Directory.html" data-type="entity-link" >Directory</a>
                            </li>
                            <li class="link">
                                <a href="classes/EncryptedStringType.html" data-type="entity-link" >EncryptedStringType</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponse.html" data-type="entity-link" >ErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalErrorFilter.html" data-type="entity-link" >GlobalErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalValidationPipe.html" data-type="entity-link" >GlobalValidationPipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridElement.html" data-type="entity-link" >GridElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lesson.html" data-type="entity-link" >Lesson</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessonFactory.html" data-type="entity-link" >LessonFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessonScope.html" data-type="entity-link" >LessonScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveElementParams.html" data-type="entity-link" >MoveElementParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveElementPosition.html" data-type="entity-link" >MoveElementPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/News.html" data-type="entity-link" >News</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsFilterQuery.html" data-type="entity-link" >NewsFilterQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsListResponse.html" data-type="entity-link" >NewsListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsMapper.html" data-type="entity-link" >NewsMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsResponse.html" data-type="entity-link" >NewsResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsScope.html" data-type="entity-link" >NewsScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQuery.html" data-type="entity-link" >PaginationQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationResponse.html" data-type="entity-link" >PaginationResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchGroupParams.html" data-type="entity-link" >PatchGroupParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResolvedUser.html" data-type="entity-link" >ResolvedUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResolvedUserMapper.html" data-type="entity-link" >ResolvedUserMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RocketChatError.html" data-type="entity-link" >RocketChatError</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/School.html" data-type="entity-link" >School</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolInfoMapper.html" data-type="entity-link" >SchoolInfoMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolInfoResponse.html" data-type="entity-link" >SchoolInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolNews.html" data-type="entity-link" >SchoolNews</a>
                            </li>
                            <li class="link">
                                <a href="classes/Scope.html" data-type="entity-link" >Scope</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerConsole.html" data-type="entity-link" >ServerConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/StorageProvider.html" data-type="entity-link" >StorageProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/Submission.html" data-type="entity-link" >Submission</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubmissionFactory.html" data-type="entity-link" >SubmissionFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/TargetInfoMapper.html" data-type="entity-link" >TargetInfoMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/TargetInfoResponse.html" data-type="entity-link" >TargetInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskFactory.html" data-type="entity-link" >TaskFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskListResponse.html" data-type="entity-link" >TaskListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskMapper.html" data-type="entity-link" >TaskMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskResponse.html" data-type="entity-link" >TaskResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskScope.html" data-type="entity-link" >TaskScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskStatusMapper.html" data-type="entity-link" >TaskStatusMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskStatusResponse.html" data-type="entity-link" >TaskStatusResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskWithStatusVo.html" data-type="entity-link" >TaskWithStatusVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Team.html" data-type="entity-link" >Team</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamNews.html" data-type="entity-link" >TeamNews</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestBootstrapConsole.html" data-type="entity-link" >TestBootstrapConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNewsParams.html" data-type="entity-link" >UpdateNewsParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInfoMapper.html" data-type="entity-link" >UserInfoMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInfoResponse.html" data-type="entity-link" >UserInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationError.html" data-type="entity-link" >ValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationErrorDetailResponse.html" data-type="entity-link" >ValidationErrorDetailResponse</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BaseRepo.html" data-type="entity-link" >BaseRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseGroupRepo.html" data-type="entity-link" >CourseGroupRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseRepo.html" data-type="entity-link" >CourseRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardModelMapper.html" data-type="entity-link" >DashboardModelMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardRepo.html" data-type="entity-link" >DashboardRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseManagementService.html" data-type="entity-link" >DatabaseManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteFilesUc.html" data-type="entity-link" >DeleteFilesUc</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DurationLoggingInterceptor.html" data-type="entity-link" >DurationLoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesRepo.html" data-type="entity-link" >FilesRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileStorageAdapter.html" data-type="entity-link" >FileStorageAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LessonRepo.html" data-type="entity-link" >LessonRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsRepo.html" data-type="entity-link" >NewsRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseObjectIdPipe.html" data-type="entity-link" >ParseObjectIdPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RocketChatService.html" data-type="entity-link" >RocketChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleRepo.html" data-type="entity-link" >RoleRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleUC.html" data-type="entity-link" >RoleUC</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageProviderRepo.html" data-type="entity-link" >StorageProviderRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubmissionRepo.html" data-type="entity-link" >SubmissionRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SymetricKeyEncryptionService.html" data-type="entity-link" >SymetricKeyEncryptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskRepo.html" data-type="entity-link" >TaskRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskUC.html" data-type="entity-link" >TaskUC</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserRepo.html" data-type="entity-link" >UserRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserUC.html" data-type="entity-link" >UserUC</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdminIdAndToken.html" data-type="entity-link" >AdminIdAndToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppendedAttachment.html" data-type="entity-link" >AppendedAttachment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EncryptionModuleOptions.html" data-type="entity-link" >EncryptionModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FeathersError.html" data-type="entity-link" >FeathersError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FeathersService.html" data-type="entity-link" >FeathersService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalConstants.html" data-type="entity-link" >GlobalConstants</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HtmlMailContent.html" data-type="entity-link" >HtmlMailContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICollectionFilePath.html" data-type="entity-link" >ICollectionFilePath</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICourseGroupProperties.html" data-type="entity-link" >ICourseGroupProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICourseProperties.html" data-type="entity-link" >ICourseProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateNews.html" data-type="entity-link" >ICreateNews</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICurrentUser.html" data-type="entity-link" >ICurrentUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDashboardModelProperties.html" data-type="entity-link" >IDashboardModelProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDashboardRepo.html" data-type="entity-link" >IDashboardRepo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IErrorType.html" data-type="entity-link" >IErrorType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileProperties.html" data-type="entity-link" >IFileProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFindOptions.html" data-type="entity-link" >IFindOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGridElement.html" data-type="entity-link" >IGridElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILearnroom.html" data-type="entity-link" >ILearnroom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILessonProperties.html" data-type="entity-link" >ILessonProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogger.html" data-type="entity-link" >ILogger</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INewsProperties.html" data-type="entity-link" >INewsProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INewsScope.html" data-type="entity-link" >INewsScope</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InlineAttachment.html" data-type="entity-link" >InlineAttachment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPagination.html" data-type="entity-link" >IPagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResolvedUser.html" data-type="entity-link" >IResolvedUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRole.html" data-type="entity-link" >IRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRoleProperties.html" data-type="entity-link" >IRoleProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISchoolProperties.html" data-type="entity-link" >ISchoolProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStorageProviderProperties.html" data-type="entity-link" >IStorageProviderProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISubmissionProperties.html" data-type="entity-link" >ISubmissionProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskProperties.html" data-type="entity-link" >ITaskProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskStatus.html" data-type="entity-link" >ITaskStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITeamProperties.html" data-type="entity-link" >ITeamProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserProperties.html" data-type="entity-link" >IUserProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtConstants.html" data-type="entity-link" >JwtConstants</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Mail.html" data-type="entity-link" >Mail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailAttachment.html" data-type="entity-link" >MailAttachment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailContent.html" data-type="entity-link" >MailContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailModuleOptions.html" data-type="entity-link" >MailModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailServiceOptions.html" data-type="entity-link" >MailServiceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewsTargetFilter.html" data-type="entity-link" >NewsTargetFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Options.html" data-type="entity-link" >Options</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlainTextMailContent.html" data-type="entity-link" >PlainTextMailContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RocketChatOptions.html" data-type="entity-link" >RocketChatOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
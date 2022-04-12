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
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
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
                                <a href="modules/AntivirusModule.html" data-type="entity-link" >AntivirusModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-23d855078395ada59872074bccbee70605473b6afbda9c261e292d6b0642aa3fb5f69585329edf0d4f08a70f3329ec91383b88c14200c740de2dead3f6b8216f"' : 'data-target="#xs-controllers-links-module-AuthModule-23d855078395ada59872074bccbee70605473b6afbda9c261e292d6b0642aa3fb5f69585329edf0d4f08a70f3329ec91383b88c14200c740de2dead3f6b8216f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-23d855078395ada59872074bccbee70605473b6afbda9c261e292d6b0642aa3fb5f69585329edf0d4f08a70f3329ec91383b88c14200c740de2dead3f6b8216f"' :
                                            'id="xs-controllers-links-module-AuthModule-23d855078395ada59872074bccbee70605473b6afbda9c261e292d6b0642aa3fb5f69585329edf0d4f08a70f3329ec91383b88c14200c740de2dead3f6b8216f"' }>
                                            <li class="link">
                                                <a href="controllers/AccountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-23d855078395ada59872074bccbee70605473b6afbda9c261e292d6b0642aa3fb5f69585329edf0d4f08a70f3329ec91383b88c14200c740de2dead3f6b8216f"' : 'data-target="#xs-injectables-links-module-AuthModule-23d855078395ada59872074bccbee70605473b6afbda9c261e292d6b0642aa3fb5f69585329edf0d4f08a70f3329ec91383b88c14200c740de2dead3f6b8216f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-23d855078395ada59872074bccbee70605473b6afbda9c261e292d6b0642aa3fb5f69585329edf0d4f08a70f3329ec91383b88c14200c740de2dead3f6b8216f"' :
                                        'id="xs-injectables-links-module-AuthModule-23d855078395ada59872074bccbee70605473b6afbda9c261e292d6b0642aa3fb5f69585329edf0d4f08a70f3329ec91383b88c14200c740de2dead3f6b8216f"' }>
                                        <li class="link">
                                            <a href="injectables/AccountRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtValidationAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtValidationAdapter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthorizationModule.html" data-type="entity-link" >AuthorizationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthorizationModule-ae4c3d468797fd2bfd8a1bde8d0b6fa4e233f4229414d489a04c88af3b8189e468fe9428dd60ec7fa2961b2e9639e9db70b68909cda8e323c42c8c4225053304"' : 'data-target="#xs-injectables-links-module-AuthorizationModule-ae4c3d468797fd2bfd8a1bde8d0b6fa4e233f4229414d489a04c88af3b8189e468fe9428dd60ec7fa2961b2e9639e9db70b68909cda8e323c42c8c4225053304"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthorizationModule-ae4c3d468797fd2bfd8a1bde8d0b6fa4e233f4229414d489a04c88af3b8189e468fe9428dd60ec7fa2961b2e9639e9db70b68909cda8e323c42c8c4225053304"' :
                                        'id="xs-injectables-links-module-AuthorizationModule-ae4c3d468797fd2bfd8a1bde8d0b6fa4e233f4229414d489a04c88af3b8189e468fe9428dd60ec7fa2961b2e9639e9db70b68909cda8e323c42c8c4225053304"' }>
                                        <li class="link">
                                            <a href="injectables/AuthorizationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthorizationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FeathersAuthProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeathersAuthProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FeathersJwtProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeathersJwtProvider</a>
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
                                <a href="modules/FilesStorageModule.html" data-type="entity-link" >FilesStorageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FilesStorageModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' : 'data-target="#xs-controllers-links-module-FilesStorageModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesStorageModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' :
                                            'id="xs-controllers-links-module-FilesStorageModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' }>
                                            <li class="link">
                                                <a href="controllers/FileSecurityController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileSecurityController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/FilesStorageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesStorageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesStorageModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' : 'data-target="#xs-injectables-links-module-FilesStorageModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesStorageModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' :
                                        'id="xs-injectables-links-module-FilesStorageModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' }>
                                        <li class="link">
                                            <a href="injectables/FileRecordRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileRecordRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileRecordUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileRecordUC</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesStorageUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesStorageUC</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/S3ClientAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >S3ClientAdapter</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesStorageTestModule.html" data-type="entity-link" >FilesStorageTestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FilesStorageTestModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' : 'data-target="#xs-controllers-links-module-FilesStorageTestModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesStorageTestModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' :
                                            'id="xs-controllers-links-module-FilesStorageTestModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' }>
                                            <li class="link">
                                                <a href="controllers/FileSecurityController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileSecurityController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/FilesStorageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesStorageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesStorageTestModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' : 'data-target="#xs-injectables-links-module-FilesStorageTestModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesStorageTestModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' :
                                        'id="xs-injectables-links-module-FilesStorageTestModule-535e793a83a6beca46605f03d5bf73f29537dab94cc852fea46eb1a206721c6abd81674865c8c37760ea2967d4753dc08ae348d07eba56b1dd1193fe7fc7aa19"' }>
                                        <li class="link">
                                            <a href="injectables/FileRecordRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileRecordRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileRecordUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileRecordUC</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesStorageUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesStorageUC</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/S3ClientAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >S3ClientAdapter</a>
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
                                <a href="modules/IdentityManagementModule.html" data-type="entity-link" >IdentityManagementModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ImportUserModule.html" data-type="entity-link" >ImportUserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ImportUserModule-1c57f6706cb2f585cd2cc719b1aab4fbd633df804acb2fbe6a5d148181e71d160103aa661604f25b76b61d62d4a4564dcfc6b6df2c41557f7f50b6a77b287fd6"' : 'data-target="#xs-controllers-links-module-ImportUserModule-1c57f6706cb2f585cd2cc719b1aab4fbd633df804acb2fbe6a5d148181e71d160103aa661604f25b76b61d62d4a4564dcfc6b6df2c41557f7f50b6a77b287fd6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ImportUserModule-1c57f6706cb2f585cd2cc719b1aab4fbd633df804acb2fbe6a5d148181e71d160103aa661604f25b76b61d62d4a4564dcfc6b6df2c41557f7f50b6a77b287fd6"' :
                                            'id="xs-controllers-links-module-ImportUserModule-1c57f6706cb2f585cd2cc719b1aab4fbd633df804acb2fbe6a5d148181e71d160103aa661604f25b76b61d62d4a4564dcfc6b6df2c41557f7f50b6a77b287fd6"' }>
                                            <li class="link">
                                                <a href="controllers/ImportUserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportUserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ImportUserModule-1c57f6706cb2f585cd2cc719b1aab4fbd633df804acb2fbe6a5d148181e71d160103aa661604f25b76b61d62d4a4564dcfc6b6df2c41557f7f50b6a77b287fd6"' : 'data-target="#xs-injectables-links-module-ImportUserModule-1c57f6706cb2f585cd2cc719b1aab4fbd633df804acb2fbe6a5d148181e71d160103aa661604f25b76b61d62d4a4564dcfc6b6df2c41557f7f50b6a77b287fd6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImportUserModule-1c57f6706cb2f585cd2cc719b1aab4fbd633df804acb2fbe6a5d148181e71d160103aa661604f25b76b61d62d4a4564dcfc6b6df2c41557f7f50b6a77b287fd6"' :
                                        'id="xs-injectables-links-module-ImportUserModule-1c57f6706cb2f585cd2cc719b1aab4fbd633df804acb2fbe6a5d148181e71d160103aa661604f25b76b61d62d4a4564dcfc6b6df2c41557f7f50b6a77b287fd6"' }>
                                        <li class="link">
                                            <a href="injectables/AccountRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ImportUserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportUserRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SystemRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserImportUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserImportUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
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
                                            'data-target="#controllers-links-module-LearnroomModule-0cf2676b8e1631434b77e3ce715f7d3f6cc044afb417a850791fcaab2f7d88784c2da2d2052cfd4c0749a32bdf56cf6c13171a8c3e4fae5204b1e12f0ae265e8"' : 'data-target="#xs-controllers-links-module-LearnroomModule-0cf2676b8e1631434b77e3ce715f7d3f6cc044afb417a850791fcaab2f7d88784c2da2d2052cfd4c0749a32bdf56cf6c13171a8c3e4fae5204b1e12f0ae265e8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LearnroomModule-0cf2676b8e1631434b77e3ce715f7d3f6cc044afb417a850791fcaab2f7d88784c2da2d2052cfd4c0749a32bdf56cf6c13171a8c3e4fae5204b1e12f0ae265e8"' :
                                            'id="xs-controllers-links-module-LearnroomModule-0cf2676b8e1631434b77e3ce715f7d3f6cc044afb417a850791fcaab2f7d88784c2da2d2052cfd4c0749a32bdf56cf6c13171a8c3e4fae5204b1e12f0ae265e8"' }>
                                            <li class="link">
                                                <a href="controllers/CourseController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/DashboardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/RoomsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LearnroomModule-0cf2676b8e1631434b77e3ce715f7d3f6cc044afb417a850791fcaab2f7d88784c2da2d2052cfd4c0749a32bdf56cf6c13171a8c3e4fae5204b1e12f0ae265e8"' : 'data-target="#xs-injectables-links-module-LearnroomModule-0cf2676b8e1631434b77e3ce715f7d3f6cc044afb417a850791fcaab2f7d88784c2da2d2052cfd4c0749a32bdf56cf6c13171a8c3e4fae5204b1e12f0ae265e8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LearnroomModule-0cf2676b8e1631434b77e3ce715f7d3f6cc044afb417a850791fcaab2f7d88784c2da2d2052cfd4c0749a32bdf56cf6c13171a8c3e4fae5204b1e12f0ae265e8"' :
                                        'id="xs-injectables-links-module-LearnroomModule-0cf2676b8e1631434b77e3ce715f7d3f6cc044afb417a850791fcaab2f7d88784c2da2d2052cfd4c0749a32bdf56cf6c13171a8c3e4fae5204b1e12f0ae265e8"' }>
                                        <li class="link">
                                            <a href="injectables/BoardRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardRepo</a>
                                        </li>
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
                                        <li class="link">
                                            <a href="injectables/LessonRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomBoardDTOFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomBoardDTOFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomBoardResponseMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomBoardResponseMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomsAuthorisationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsAuthorisationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomsUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
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
                                            'data-target="#controllers-links-module-ManagementModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' : 'data-target="#xs-controllers-links-module-ManagementModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ManagementModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' :
                                            'id="xs-controllers-links-module-ManagementModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' }>
                                            <li class="link">
                                                <a href="controllers/DatabaseManagementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseManagementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ManagementModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' : 'data-target="#xs-injectables-links-module-ManagementModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManagementModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' :
                                        'id="xs-injectables-links-module-ManagementModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' }>
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
                                <a href="modules/ManagementTestModule.html" data-type="entity-link" >ManagementTestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ManagementTestModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' : 'data-target="#xs-controllers-links-module-ManagementTestModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ManagementTestModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' :
                                            'id="xs-controllers-links-module-ManagementTestModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' }>
                                            <li class="link">
                                                <a href="controllers/DatabaseManagementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseManagementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ManagementTestModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' : 'data-target="#xs-injectables-links-module-ManagementTestModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManagementTestModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' :
                                        'id="xs-injectables-links-module-ManagementTestModule-867cd65e5fd89061de9d3d515ac395c04a3c6349c04f8a6d01bce318645d59cf4cdc6e0e6e13a88bbbaf5e952adb64a02984078fe6a1d721530689ecf586864c"' }>
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
                                <a href="modules/OauthModule.html" data-type="entity-link" >OauthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OauthModule-329fb1a27e12c00f95a9120817a710cee3f0f8ad5db95b03488b2cb68c1e42e089e0ba46dcdae0235026acd91bd5cf22a1d247574b57b1d7ead7c85e32975b7f"' : 'data-target="#xs-controllers-links-module-OauthModule-329fb1a27e12c00f95a9120817a710cee3f0f8ad5db95b03488b2cb68c1e42e089e0ba46dcdae0235026acd91bd5cf22a1d247574b57b1d7ead7c85e32975b7f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OauthModule-329fb1a27e12c00f95a9120817a710cee3f0f8ad5db95b03488b2cb68c1e42e089e0ba46dcdae0235026acd91bd5cf22a1d247574b57b1d7ead7c85e32975b7f"' :
                                            'id="xs-controllers-links-module-OauthModule-329fb1a27e12c00f95a9120817a710cee3f0f8ad5db95b03488b2cb68c1e42e089e0ba46dcdae0235026acd91bd5cf22a1d247574b57b1d7ead7c85e32975b7f"' }>
                                            <li class="link">
                                                <a href="controllers/OauthSSOController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthSSOController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OauthModule-329fb1a27e12c00f95a9120817a710cee3f0f8ad5db95b03488b2cb68c1e42e089e0ba46dcdae0235026acd91bd5cf22a1d247574b57b1d7ead7c85e32975b7f"' : 'data-target="#xs-injectables-links-module-OauthModule-329fb1a27e12c00f95a9120817a710cee3f0f8ad5db95b03488b2cb68c1e42e089e0ba46dcdae0235026acd91bd5cf22a1d247574b57b1d7ead7c85e32975b7f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OauthModule-329fb1a27e12c00f95a9120817a710cee3f0f8ad5db95b03488b2cb68c1e42e089e0ba46dcdae0235026acd91bd5cf22a1d247574b57b1d7ead7c85e32975b7f"' :
                                        'id="xs-injectables-links-module-OauthModule-329fb1a27e12c00f95a9120817a710cee3f0f8ad5db95b03488b2cb68c1e42e089e0ba46dcdae0235026acd91bd5cf22a1d247574b57b1d7ead7c85e32975b7f"' }>
                                        <li class="link">
                                            <a href="injectables/OauthUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SystemRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RabbitMQWrapperModule.html" data-type="entity-link" >RabbitMQWrapperModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RabbitMQWrapperTestModule.html" data-type="entity-link" >RabbitMQWrapperTestModule</a>
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
                                            'data-target="#controllers-links-module-ServerModule-84a980335cfb00ad915dd462d684e91b0f8277a6ccfda6c837cdb5c888db9e220df4bbc0ee7c636bf76ec02935fc5d5cf774c2d33a2aedf8e8dd820c277517c4"' : 'data-target="#xs-controllers-links-module-ServerModule-84a980335cfb00ad915dd462d684e91b0f8277a6ccfda6c837cdb5c888db9e220df4bbc0ee7c636bf76ec02935fc5d5cf774c2d33a2aedf8e8dd820c277517c4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServerModule-84a980335cfb00ad915dd462d684e91b0f8277a6ccfda6c837cdb5c888db9e220df4bbc0ee7c636bf76ec02935fc5d5cf774c2d33a2aedf8e8dd820c277517c4"' :
                                            'id="xs-controllers-links-module-ServerModule-84a980335cfb00ad915dd462d684e91b0f8277a6ccfda6c837cdb5c888db9e220df4bbc0ee7c636bf76ec02935fc5d5cf774c2d33a2aedf8e8dd820c277517c4"' }>
                                            <li class="link">
                                                <a href="controllers/ServerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServerController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServerTestModule.html" data-type="entity-link" >ServerTestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ServerTestModule-84a980335cfb00ad915dd462d684e91b0f8277a6ccfda6c837cdb5c888db9e220df4bbc0ee7c636bf76ec02935fc5d5cf774c2d33a2aedf8e8dd820c277517c4"' : 'data-target="#xs-controllers-links-module-ServerTestModule-84a980335cfb00ad915dd462d684e91b0f8277a6ccfda6c837cdb5c888db9e220df4bbc0ee7c636bf76ec02935fc5d5cf774c2d33a2aedf8e8dd820c277517c4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServerTestModule-84a980335cfb00ad915dd462d684e91b0f8277a6ccfda6c837cdb5c888db9e220df4bbc0ee7c636bf76ec02935fc5d5cf774c2d33a2aedf8e8dd820c277517c4"' :
                                            'id="xs-controllers-links-module-ServerTestModule-84a980335cfb00ad915dd462d684e91b0f8277a6ccfda6c837cdb5c888db9e220df4bbc0ee7c636bf76ec02935fc5d5cf774c2d33a2aedf8e8dd820c277517c4"' }>
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
                                            'data-target="#controllers-links-module-TaskModule-1870e21021e36eaf4ed0db8c6ea123de0127dbfa493df22adb771372851d7365758565343c42940a1ad1fd991917e88e2f2b83fda119cc1d486771b84a7e0cbb"' : 'data-target="#xs-controllers-links-module-TaskModule-1870e21021e36eaf4ed0db8c6ea123de0127dbfa493df22adb771372851d7365758565343c42940a1ad1fd991917e88e2f2b83fda119cc1d486771b84a7e0cbb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-1870e21021e36eaf4ed0db8c6ea123de0127dbfa493df22adb771372851d7365758565343c42940a1ad1fd991917e88e2f2b83fda119cc1d486771b84a7e0cbb"' :
                                            'id="xs-controllers-links-module-TaskModule-1870e21021e36eaf4ed0db8c6ea123de0127dbfa493df22adb771372851d7365758565343c42940a1ad1fd991917e88e2f2b83fda119cc1d486771b84a7e0cbb"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TaskModule-1870e21021e36eaf4ed0db8c6ea123de0127dbfa493df22adb771372851d7365758565343c42940a1ad1fd991917e88e2f2b83fda119cc1d486771b84a7e0cbb"' : 'data-target="#xs-injectables-links-module-TaskModule-1870e21021e36eaf4ed0db8c6ea123de0127dbfa493df22adb771372851d7365758565343c42940a1ad1fd991917e88e2f2b83fda119cc1d486771b84a7e0cbb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-1870e21021e36eaf4ed0db8c6ea123de0127dbfa493df22adb771372851d7365758565343c42940a1ad1fd991917e88e2f2b83fda119cc1d486771b84a7e0cbb"' :
                                        'id="xs-injectables-links-module-TaskModule-1870e21021e36eaf4ed0db8c6ea123de0127dbfa493df22adb771372851d7365758565343c42940a1ad1fd991917e88e2f2b83fda119cc1d486771b84a7e0cbb"' }>
                                        <li class="link">
                                            <a href="injectables/CourseRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LessonRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
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
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-41f4fe3f2c377afc49b39e050ad6fb9bd80b808f41957604d4e4866fd100b7094541b16955b32b69519f3f4cbaa9b7179be42743a297d7735ed6d6002754827f"' : 'data-target="#xs-controllers-links-module-UserModule-41f4fe3f2c377afc49b39e050ad6fb9bd80b808f41957604d4e4866fd100b7094541b16955b32b69519f3f4cbaa9b7179be42743a297d7735ed6d6002754827f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-41f4fe3f2c377afc49b39e050ad6fb9bd80b808f41957604d4e4866fd100b7094541b16955b32b69519f3f4cbaa9b7179be42743a297d7735ed6d6002754827f"' :
                                            'id="xs-controllers-links-module-UserModule-41f4fe3f2c377afc49b39e050ad6fb9bd80b808f41957604d4e4866fd100b7094541b16955b32b69519f3f4cbaa9b7179be42743a297d7735ed6d6002754827f"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-41f4fe3f2c377afc49b39e050ad6fb9bd80b808f41957604d4e4866fd100b7094541b16955b32b69519f3f4cbaa9b7179be42743a297d7735ed6d6002754827f"' : 'data-target="#xs-injectables-links-module-UserModule-41f4fe3f2c377afc49b39e050ad6fb9bd80b808f41957604d4e4866fd100b7094541b16955b32b69519f3f4cbaa9b7179be42743a297d7735ed6d6002754827f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-41f4fe3f2c377afc49b39e050ad6fb9bd80b808f41957604d4e4866fd100b7094541b16955b32b69519f3f4cbaa9b7179be42743a297d7735ed6d6002754827f"' :
                                        'id="xs-injectables-links-module-UserModule-41f4fe3f2c377afc49b39e050ad6fb9bd80b808f41957604d4e4866fd100b7094541b16955b32b69519f3f4cbaa9b7179be42743a297d7735ed6d6002754827f"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserConfig.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserConfig</a>
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
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Account.html" data-type="entity-link" >Account</a>
                                </li>
                                <li class="link">
                                    <a href="entities/BaseFile.html" data-type="entity-link" >BaseFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Board.html" data-type="entity-link" >Board</a>
                                </li>
                                <li class="link">
                                    <a href="entities/BoardElement.html" data-type="entity-link" >BoardElement</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Course.html" data-type="entity-link" >Course</a>
                                </li>
                                <li class="link">
                                    <a href="entities/CourseGroup.html" data-type="entity-link" >CourseGroup</a>
                                </li>
                                <li class="link">
                                    <a href="entities/CourseNews.html" data-type="entity-link" >CourseNews</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DashboardGridElementModel.html" data-type="entity-link" >DashboardGridElementModel</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DashboardModelEntity.html" data-type="entity-link" >DashboardModelEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Directory.html" data-type="entity-link" >Directory</a>
                                </li>
                                <li class="link">
                                    <a href="entities/File.html" data-type="entity-link" >File</a>
                                </li>
                                <li class="link">
                                    <a href="entities/FileRecord.html" data-type="entity-link" >FileRecord</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ImportUser.html" data-type="entity-link" >ImportUser</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Lesson.html" data-type="entity-link" >Lesson</a>
                                </li>
                                <li class="link">
                                    <a href="entities/LessonBoardElement.html" data-type="entity-link" >LessonBoardElement</a>
                                </li>
                                <li class="link">
                                    <a href="entities/News.html" data-type="entity-link" >News</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/School.html" data-type="entity-link" >School</a>
                                </li>
                                <li class="link">
                                    <a href="entities/SchoolNews.html" data-type="entity-link" >SchoolNews</a>
                                </li>
                                <li class="link">
                                    <a href="entities/StorageProvider.html" data-type="entity-link" >StorageProvider</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Submission.html" data-type="entity-link" >Submission</a>
                                </li>
                                <li class="link">
                                    <a href="entities/System.html" data-type="entity-link" >System</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Task.html" data-type="entity-link" >Task</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TaskBoardElement.html" data-type="entity-link" >TaskBoardElement</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Team.html" data-type="entity-link" >Team</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TeamNews.html" data-type="entity-link" >TeamNews</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
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
                                <a href="classes/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiValidationError.html" data-type="entity-link" >ApiValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiValidationErrorResponse.html" data-type="entity-link" >ApiValidationErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthorizationError.html" data-type="entity-link" >AuthorizationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthorizationParams.html" data-type="entity-link" >AuthorizationParams</a>
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
                                <a href="classes/BoardElementResponse.html" data-type="entity-link" >BoardElementResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardLessonResponse.html" data-type="entity-link" >BoardLessonResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardLockedTaskResponse.html" data-type="entity-link" >BoardLockedTaskResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardResponse.html" data-type="entity-link" >BoardResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardTaskResponse.html" data-type="entity-link" >BoardTaskResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardTaskStatusMapper.html" data-type="entity-link" >BoardTaskStatusMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardTaskStatusResponse.html" data-type="entity-link" >BoardTaskStatusResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BusinessError.html" data-type="entity-link" >BusinessError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeLanguageParams.html" data-type="entity-link" >ChangeLanguageParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordParams.html" data-type="entity-link" >ChangePasswordParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFileParams.html" data-type="entity-link" >CopyFileParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFilesOfParentParams.html" data-type="entity-link" >CopyFilesOfParentParams</a>
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
                                <a href="classes/CourseScope.html" data-type="entity-link" >CourseScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNewsParams.html" data-type="entity-link" >CreateNewsParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardEntity.html" data-type="entity-link" >DashboardEntity</a>
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
                                <a href="classes/DashboardResponse.html" data-type="entity-link" >DashboardResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseManagementConsole.html" data-type="entity-link" >DatabaseManagementConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteFilesConsole.html" data-type="entity-link" >DeleteFilesConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/DownloadFileParams.html" data-type="entity-link" >DownloadFileParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/DtoCreator.html" data-type="entity-link" >DtoCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/EncryptedStringType.html" data-type="entity-link" >EncryptedStringType</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityNotFoundError.html" data-type="entity-link" >EntityNotFoundError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponse.html" data-type="entity-link" >ErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileParams.html" data-type="entity-link" >FileParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRecord.html" data-type="entity-link" >FileRecord</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRecordListResponse.html" data-type="entity-link" >FileRecordListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRecordParams.html" data-type="entity-link" >FileRecordParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRecordResponse.html" data-type="entity-link" >FileRecordResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRecordScope.html" data-type="entity-link" >FileRecordScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileSecurityCheck.html" data-type="entity-link" >FileSecurityCheck</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterImportUserParams.html" data-type="entity-link" >FilterImportUserParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterNewsParams.html" data-type="entity-link" >FilterNewsParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterUserParams.html" data-type="entity-link" >FilterUserParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForbiddenOperationError.html" data-type="entity-link" >ForbiddenOperationError</a>
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
                                <a href="classes/IdentityManagement.html" data-type="entity-link" >IdentityManagement</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImportUser.html" data-type="entity-link" >ImportUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImportUserFactory.html" data-type="entity-link" >ImportUserFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImportUserListResponse.html" data-type="entity-link" >ImportUserListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImportUserMapper.html" data-type="entity-link" >ImportUserMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImportUserMatchMapper.html" data-type="entity-link" >ImportUserMatchMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImportUserResponse.html" data-type="entity-link" >ImportUserResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImportUserScope.html" data-type="entity-link" >ImportUserScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtExtractor.html" data-type="entity-link" >JwtExtractor</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessonFactory.html" data-type="entity-link" >LessonFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessonScope.html" data-type="entity-link" >LessonScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/MongoPatterns.html" data-type="entity-link" >MongoPatterns</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveElementParams.html" data-type="entity-link" >MoveElementParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveElementPositionParams.html" data-type="entity-link" >MoveElementPositionParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/News.html" data-type="entity-link" >News</a>
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
                                <a href="classes/OauthConfig.html" data-type="entity-link" >OauthConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/OAuthResponse.html" data-type="entity-link" >OAuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/OAuthSSOError.html" data-type="entity-link" >OAuthSSOError</a>
                            </li>
                            <li class="link">
                                <a href="classes/OauthTokenResponse.html" data-type="entity-link" >OauthTokenResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link" >PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationResponse.html" data-type="entity-link" >PaginationResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchGroupParams.html" data-type="entity-link" >PatchGroupParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchMyAccountParams.html" data-type="entity-link" >PatchMyAccountParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchMyPasswordParams.html" data-type="entity-link" >PatchMyPasswordParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchOrderParams.html" data-type="entity-link" >PatchOrderParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchVisibilityParams.html" data-type="entity-link" >PatchVisibilityParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/RenameFileParams.html" data-type="entity-link" >RenameFileParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResolvedUserMapper.html" data-type="entity-link" >ResolvedUserMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResolvedUserResponse.html" data-type="entity-link" >ResolvedUserResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/RocketChatError.html" data-type="entity-link" >RocketChatError</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleNameMapper.html" data-type="entity-link" >RoleNameMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScanResultParams.html" data-type="entity-link" >ScanResultParams</a>
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
                                <a href="classes/Scope.html" data-type="entity-link" >Scope</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerConsole.html" data-type="entity-link" >ServerConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/SingleFileParams.html" data-type="entity-link" >SingleFileParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortImportUserParams.html" data-type="entity-link" >SortImportUserParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortingParams.html" data-type="entity-link" >SortingParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/StringValidator.html" data-type="entity-link" >StringValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/Submission.html" data-type="entity-link" >Submission</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubmissionFactory.html" data-type="entity-link" >SubmissionFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/SuccessfulResponse.html" data-type="entity-link" >SuccessfulResponse</a>
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
                                <a href="classes/TestBootstrapConsole.html" data-type="entity-link" >TestBootstrapConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenRequestParams.html" data-type="entity-link" >TokenRequestParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenRequestParamsMapper.html" data-type="entity-link" >TokenRequestParamsMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenRequestPayload.html" data-type="entity-link" >TokenRequestPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenRequestPayloadMapper.html" data-type="entity-link" >TokenRequestPayloadMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFlagParams.html" data-type="entity-link" >UpdateFlagParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMatchParams.html" data-type="entity-link" >UpdateMatchParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNewsParams.html" data-type="entity-link" >UpdateNewsParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAlreadyAssignedToImportUserError.html" data-type="entity-link" >UserAlreadyAssignedToImportUserError</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserFactory.html" data-type="entity-link" >UserFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInfoMapper.html" data-type="entity-link" >UserInfoMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInfoResponse.html" data-type="entity-link" >UserInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserMatchListResponse.html" data-type="entity-link" >UserMatchListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserMatchMapper.html" data-type="entity-link" >UserMatchMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserMatchResponse.html" data-type="entity-link" >UserMatchResponse</a>
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
                                    <a href="injectables/AccountRepo.html" data-type="entity-link" >AccountRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AntivirusService.html" data-type="entity-link" >AntivirusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseRepo.html" data-type="entity-link" >BaseRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BoardRepo.html" data-type="entity-link" >BoardRepo</a>
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
                                    <a href="injectables/FileRecordRepo.html" data-type="entity-link" >FileRecordRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesRepo.html" data-type="entity-link" >FilesRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileStorageAdapter.html" data-type="entity-link" >FileStorageAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImportUserRepo.html" data-type="entity-link" >ImportUserRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KeycloakIdentityManagement.html" data-type="entity-link" >KeycloakIdentityManagement</a>
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
                                    <a href="injectables/PermissionService.html" data-type="entity-link" >PermissionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RocketChatService.html" data-type="entity-link" >RocketChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleRepo.html" data-type="entity-link" >RoleRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolRepo.html" data-type="entity-link" >SchoolRepo</a>
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
                                    <a href="injectables/SystemRepo.html" data-type="entity-link" >SystemRepo</a>
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
                                <a href="interfaces/AntivirusModuleOptions.html" data-type="entity-link" >AntivirusModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AntivirusServiceOptions.html" data-type="entity-link" >AntivirusServiceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppendedAttachment.html" data-type="entity-link" >AppendedAttachment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DashboardGridElementModelProperties.html" data-type="entity-link" >DashboardGridElementModelProperties</a>
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
                                <a href="interfaces/IAccount.html" data-type="entity-link" >IAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAccountUpdate.html" data-type="entity-link" >IAccountUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICollectionFilePath.html" data-type="entity-link" >ICollectionFilePath</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICopyFiles.html" data-type="entity-link" >ICopyFiles</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICoreModuleConfig.html" data-type="entity-link" >ICoreModuleConfig</a>
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
                                <a href="interfaces/IFile.html" data-type="entity-link" >IFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileProperties.html" data-type="entity-link" >IFileProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileRecordProperties.html" data-type="entity-link" >IFileRecordProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileSecurityCheckProperties.html" data-type="entity-link" >IFileSecurityCheckProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileStorageConfig.html" data-type="entity-link" >IFileStorageConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFindOptions.html" data-type="entity-link" >IFindOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetFileResponse.html" data-type="entity-link" >IGetFileResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGridElement.html" data-type="entity-link" >IGridElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IImportUserProperties.html" data-type="entity-link" >IImportUserProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IImportUserScope.html" data-type="entity-link" >IImportUserScope</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IInterceptorConfig.html" data-type="entity-link" >IInterceptorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJWT.html" data-type="entity-link" >IJWT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILearnroom.html" data-type="entity-link" >ILearnroom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILearnroomElement.html" data-type="entity-link" >ILearnroomElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILessonProperties.html" data-type="entity-link" >ILessonProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogger.html" data-type="entity-link" >ILogger</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INameMatch.html" data-type="entity-link" >INameMatch</a>
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
                                <a href="interfaces/IServerConfig.html" data-type="entity-link" >IServerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStorageClient.html" data-type="entity-link" >IStorageClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStorageProviderProperties.html" data-type="entity-link" >IStorageProviderProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISubmissionProperties.html" data-type="entity-link" >ISubmissionProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISystemProperties.html" data-type="entity-link" >ISystemProperties</a>
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
                                <a href="interfaces/KcCredentials.html" data-type="entity-link" >KcCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/KcSettings.html" data-type="entity-link" >KcSettings</a>
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
                                <a href="interfaces/S3Config.html" data-type="entity-link" >S3Config</a>
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
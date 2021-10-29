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
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
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
                                            'data-target="#additional-page-8059e9cef64a8ad4617a0e65f3aa663f"' : 'data-target="#xs-additional-page-8059e9cef64a8ad4617a0e65f3aa663f"' }>
                                                <span class="link-name">NestJS Application</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-8059e9cef64a8ad4617a0e65f3aa663f"' : 'id="xs-additional-page-8059e9cef64a8ad4617a0e65f3aa663f"' }>
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
                                        'data-target="#injectables-links-module-AuthModule-531514206d2904a53f123d4143185393"' : 'data-target="#xs-injectables-links-module-AuthModule-531514206d2904a53f123d4143185393"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-531514206d2904a53f123d4143185393"' :
                                        'id="xs-injectables-links-module-AuthModule-531514206d2904a53f123d4143185393"' }>
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
                                        'data-target="#injectables-links-module-AuthorizationModule-d6097bba2d3d56744e48e1d77803bef0"' : 'data-target="#xs-injectables-links-module-AuthorizationModule-d6097bba2d3d56744e48e1d77803bef0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthorizationModule-d6097bba2d3d56744e48e1d77803bef0"' :
                                        'id="xs-injectables-links-module-AuthorizationModule-d6097bba2d3d56744e48e1d77803bef0"' }>
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
                                        'data-target="#injectables-links-module-ConsoleWriterModule-844a942f26cbeee3b7ce088965609fb7"' : 'data-target="#xs-injectables-links-module-ConsoleWriterModule-844a942f26cbeee3b7ce088965609fb7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConsoleWriterModule-844a942f26cbeee3b7ce088965609fb7"' :
                                        'id="xs-injectables-links-module-ConsoleWriterModule-844a942f26cbeee3b7ce088965609fb7"' }>
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
                                        'data-target="#injectables-links-module-FeathersModule-d0e6855685938f9fa18af670e4efab18"' : 'data-target="#xs-injectables-links-module-FeathersModule-d0e6855685938f9fa18af670e4efab18"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FeathersModule-d0e6855685938f9fa18af670e4efab18"' :
                                        'id="xs-injectables-links-module-FeathersModule-d0e6855685938f9fa18af670e4efab18"' }>
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
                                        'data-target="#injectables-links-module-FilesModule-6dc7879173c8bb7d7bec29916201ca61"' : 'data-target="#xs-injectables-links-module-FilesModule-6dc7879173c8bb7d7bec29916201ca61"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-6dc7879173c8bb7d7bec29916201ca61"' :
                                        'id="xs-injectables-links-module-FilesModule-6dc7879173c8bb7d7bec29916201ca61"' }>
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
                                        'data-target="#injectables-links-module-FileSystemModule-b8e2690e83eab6078ef8f9c87c948f43"' : 'data-target="#xs-injectables-links-module-FileSystemModule-b8e2690e83eab6078ef8f9c87c948f43"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileSystemModule-b8e2690e83eab6078ef8f9c87c948f43"' :
                                        'id="xs-injectables-links-module-FileSystemModule-b8e2690e83eab6078ef8f9c87c948f43"' }>
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
                                            'data-target="#controllers-links-module-LearnroomModule-0698210be2e9b035e0d81d98f5edf94b"' : 'data-target="#xs-controllers-links-module-LearnroomModule-0698210be2e9b035e0d81d98f5edf94b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LearnroomModule-0698210be2e9b035e0d81d98f5edf94b"' :
                                            'id="xs-controllers-links-module-LearnroomModule-0698210be2e9b035e0d81d98f5edf94b"' }>
                                            <li class="link">
                                                <a href="controllers/DashboardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LearnroomModule-0698210be2e9b035e0d81d98f5edf94b"' : 'data-target="#xs-injectables-links-module-LearnroomModule-0698210be2e9b035e0d81d98f5edf94b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LearnroomModule-0698210be2e9b035e0d81d98f5edf94b"' :
                                        'id="xs-injectables-links-module-LearnroomModule-0698210be2e9b035e0d81d98f5edf94b"' }>
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
                                        'data-target="#injectables-links-module-LoggerModule-8ba8d456b47ff5c9286092ab4518db2a"' : 'data-target="#xs-injectables-links-module-LoggerModule-8ba8d456b47ff5c9286092ab4518db2a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-8ba8d456b47ff5c9286092ab4518db2a"' :
                                        'id="xs-injectables-links-module-LoggerModule-8ba8d456b47ff5c9286092ab4518db2a"' }>
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
                                            'data-target="#controllers-links-module-ManagementModule-7528a677b90868811cacc0b20825d123"' : 'data-target="#xs-controllers-links-module-ManagementModule-7528a677b90868811cacc0b20825d123"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ManagementModule-7528a677b90868811cacc0b20825d123"' :
                                            'id="xs-controllers-links-module-ManagementModule-7528a677b90868811cacc0b20825d123"' }>
                                            <li class="link">
                                                <a href="controllers/DatabaseManagementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseManagementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ManagementModule-7528a677b90868811cacc0b20825d123"' : 'data-target="#xs-injectables-links-module-ManagementModule-7528a677b90868811cacc0b20825d123"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManagementModule-7528a677b90868811cacc0b20825d123"' :
                                        'id="xs-injectables-links-module-ManagementModule-7528a677b90868811cacc0b20825d123"' }>
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
                                            'data-target="#controllers-links-module-NewsModule-9cf5c9e29f94fdc8b2782a2256aa6f8b"' : 'data-target="#xs-controllers-links-module-NewsModule-9cf5c9e29f94fdc8b2782a2256aa6f8b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NewsModule-9cf5c9e29f94fdc8b2782a2256aa6f8b"' :
                                            'id="xs-controllers-links-module-NewsModule-9cf5c9e29f94fdc8b2782a2256aa6f8b"' }>
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
                                        'data-target="#injectables-links-module-NewsModule-9cf5c9e29f94fdc8b2782a2256aa6f8b"' : 'data-target="#xs-injectables-links-module-NewsModule-9cf5c9e29f94fdc8b2782a2256aa6f8b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NewsModule-9cf5c9e29f94fdc8b2782a2256aa6f8b"' :
                                        'id="xs-injectables-links-module-NewsModule-9cf5c9e29f94fdc8b2782a2256aa6f8b"' }>
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
                                            'data-target="#controllers-links-module-ServerModule-3dafd0d912db01e769841fffa7ac2764"' : 'data-target="#xs-controllers-links-module-ServerModule-3dafd0d912db01e769841fffa7ac2764"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServerModule-3dafd0d912db01e769841fffa7ac2764"' :
                                            'id="xs-controllers-links-module-ServerModule-3dafd0d912db01e769841fffa7ac2764"' }>
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
                                            'data-target="#controllers-links-module-TaskModule-73e711d01a2ef14727dc7bccf43c84ec"' : 'data-target="#xs-controllers-links-module-TaskModule-73e711d01a2ef14727dc7bccf43c84ec"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-73e711d01a2ef14727dc7bccf43c84ec"' :
                                            'id="xs-controllers-links-module-TaskModule-73e711d01a2ef14727dc7bccf43c84ec"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TaskModule-73e711d01a2ef14727dc7bccf43c84ec"' : 'data-target="#xs-injectables-links-module-TaskModule-73e711d01a2ef14727dc7bccf43c84ec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-73e711d01a2ef14727dc7bccf43c84ec"' :
                                        'id="xs-injectables-links-module-TaskModule-73e711d01a2ef14727dc7bccf43c84ec"' }>
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
                                            'data-target="#controllers-links-module-UserModule-45dcda805f40fd02e97af7cd8b2c4423"' : 'data-target="#xs-controllers-links-module-UserModule-45dcda805f40fd02e97af7cd8b2c4423"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-45dcda805f40fd02e97af7cd8b2c4423"' :
                                            'id="xs-controllers-links-module-UserModule-45dcda805f40fd02e97af7cd8b2c4423"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-45dcda805f40fd02e97af7cd8b2c4423"' : 'data-target="#xs-injectables-links-module-UserModule-45dcda805f40fd02e97af7cd8b2c4423"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-45dcda805f40fd02e97af7cd8b2c4423"' :
                                        'id="xs-injectables-links-module-UserModule-45dcda805f40fd02e97af7cd8b2c4423"' }>
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
                                <a href="classes/CourseGroup.html" data-type="entity-link" >CourseGroup</a>
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
                                <a href="classes/DefaultGridReference.html" data-type="entity-link" >DefaultGridReference</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultGridReferenceModel.html" data-type="entity-link" >DefaultGridReferenceModel</a>
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
                                <a href="interfaces/IGridElementReference.html" data-type="entity-link" >IGridElementReference</a>
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
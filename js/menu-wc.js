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
                                                <a href="additional-documentation/nestjs-application/file-structure.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">File Structure</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/api-design.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">API Design</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/cross-cutting-concerns.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Cross-cutting concerns</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/testing.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Testing</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/vscode.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">VSCode</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/git.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Git</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/keycloak.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Keycloak</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/rocket.chat.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Rocket.Chat</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/configuration.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Configuration</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/nestjs-application/authorisation.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Authorisation</a>
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
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AccountModule-96657f1c20a12b08c4aa6f15cde5f15ebe1dff9a3cd4ba9edb15b188f05f6cd6fa16dfc2c92052379864f43e9e1aa1e2c9010c8836152c55506826a75e8205ff"' : 'data-target="#xs-controllers-links-module-AccountModule-96657f1c20a12b08c4aa6f15cde5f15ebe1dff9a3cd4ba9edb15b188f05f6cd6fa16dfc2c92052379864f43e9e1aa1e2c9010c8836152c55506826a75e8205ff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AccountModule-96657f1c20a12b08c4aa6f15cde5f15ebe1dff9a3cd4ba9edb15b188f05f6cd6fa16dfc2c92052379864f43e9e1aa1e2c9010c8836152c55506826a75e8205ff"' :
                                            'id="xs-controllers-links-module-AccountModule-96657f1c20a12b08c4aa6f15cde5f15ebe1dff9a3cd4ba9edb15b188f05f6cd6fa16dfc2c92052379864f43e9e1aa1e2c9010c8836152c55506826a75e8205ff"' }>
                                            <li class="link">
                                                <a href="controllers/AccountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AccountModule-96657f1c20a12b08c4aa6f15cde5f15ebe1dff9a3cd4ba9edb15b188f05f6cd6fa16dfc2c92052379864f43e9e1aa1e2c9010c8836152c55506826a75e8205ff"' : 'data-target="#xs-injectables-links-module-AccountModule-96657f1c20a12b08c4aa6f15cde5f15ebe1dff9a3cd4ba9edb15b188f05f6cd6fa16dfc2c92052379864f43e9e1aa1e2c9010c8836152c55506826a75e8205ff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountModule-96657f1c20a12b08c4aa6f15cde5f15ebe1dff9a3cd4ba9edb15b188f05f6cd6fa16dfc2c92052379864f43e9e1aa1e2c9010c8836152c55506826a75e8205ff"' :
                                        'id="xs-injectables-links-module-AccountModule-96657f1c20a12b08c4aa6f15cde5f15ebe1dff9a3cd4ba9edb15b188f05f6cd6fa16dfc2c92052379864f43e9e1aa1e2c9010c8836152c55506826a75e8205ff"' }>
                                        <li class="link">
                                            <a href="injectables/AccountRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountValidationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountValidationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
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
                                <a href="modules/AntivirusModule.html" data-type="entity-link" >AntivirusModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-f167b0b72adbaebcfdf21ea2fa4cfa99fd186fa43d4a9a4b3fd24696d7308433332053bda878eb0c069e77b199f82a2d89f5279bd2068b82f036a7227c5ea314"' : 'data-target="#xs-injectables-links-module-AuthModule-f167b0b72adbaebcfdf21ea2fa4cfa99fd186fa43d4a9a4b3fd24696d7308433332053bda878eb0c069e77b199f82a2d89f5279bd2068b82f036a7227c5ea314"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-f167b0b72adbaebcfdf21ea2fa4cfa99fd186fa43d4a9a4b3fd24696d7308433332053bda878eb0c069e77b199f82a2d89f5279bd2068b82f036a7227c5ea314"' :
                                        'id="xs-injectables-links-module-AuthModule-f167b0b72adbaebcfdf21ea2fa4cfa99fd186fa43d4a9a4b3fd24696d7308433332053bda878eb0c069e77b199f82a2d89f5279bd2068b82f036a7227c5ea314"' }>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtValidationAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtValidationAdapter</a>
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
                                        'data-target="#injectables-links-module-AuthorizationModule-a44a04e571d15c0362377aa4a7dd38f4bab705db3ba062c3f9aa9949ce224f292cee5e1927e1b8b90d0a2d814d330f346f7f1a8dc31014c0ba4c178ab7cd7e94"' : 'data-target="#xs-injectables-links-module-AuthorizationModule-a44a04e571d15c0362377aa4a7dd38f4bab705db3ba062c3f9aa9949ce224f292cee5e1927e1b8b90d0a2d814d330f346f7f1a8dc31014c0ba4c178ab7cd7e94"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthorizationModule-a44a04e571d15c0362377aa4a7dd38f4bab705db3ba062c3f9aa9949ce224f292cee5e1927e1b8b90d0a2d814d330f346f7f1a8dc31014c0ba4c178ab7cd7e94"' :
                                        'id="xs-injectables-links-module-AuthorizationModule-a44a04e571d15c0362377aa4a7dd38f4bab705db3ba062c3f9aa9949ce224f292cee5e1927e1b8b90d0a2d814d330f346f7f1a8dc31014c0ba4c178ab7cd7e94"' }>
                                        <li class="link">
                                            <a href="injectables/AuthorizationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthorizationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseGroupRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseGroupRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseGroupRule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseGroupRule</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRule</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FeathersAuthProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeathersAuthProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FeathersAuthorizationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeathersAuthorizationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FeathersJwtProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeathersJwtProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LessonRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LessonRule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonRule</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReferenceLoader.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReferenceLoader</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolRule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolRule</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SubmissionRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubmissionRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SubmissionRule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubmissionRule</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskRule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRule</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeamRule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamRule</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeamsRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRule</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarModule.html" data-type="entity-link" >CalendarModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CalendarModule-65db2258a462a44a54d31d3558dd9f6ab06e6e9b8a066fe8fa59204b4f84d1635817f4b2a81db1d70890a9757b5766e6a3b7ac4a05f0de876021422fb242f21d"' : 'data-target="#xs-injectables-links-module-CalendarModule-65db2258a462a44a54d31d3558dd9f6ab06e6e9b8a066fe8fa59204b4f84d1635817f4b2a81db1d70890a9757b5766e6a3b7ac4a05f0de876021422fb242f21d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CalendarModule-65db2258a462a44a54d31d3558dd9f6ab06e6e9b8a066fe8fa59204b4f84d1635817f4b2a81db1d70890a9757b5766e6a3b7ac4a05f0de876021422fb242f21d"' :
                                        'id="xs-injectables-links-module-CalendarModule-65db2258a462a44a54d31d3558dd9f6ab06e6e9b8a066fe8fa59204b4f84d1635817f4b2a81db1d70890a9757b5766e6a3b7ac4a05f0de876021422fb242f21d"' }>
                                        <li class="link">
                                            <a href="injectables/CalendarMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CalendarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CollaborativeStorageAdapterModule.html" data-type="entity-link" >CollaborativeStorageAdapterModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CollaborativeStorageAdapterModule-0cba830b153bcea5021e684c7276d7c1114a9750a8ed3f8bd362c7fc26a5c7b51d5582fc76ac154e2309cddd7b79bdac0f6b413aee983ee27616b698431481b2"' : 'data-target="#xs-injectables-links-module-CollaborativeStorageAdapterModule-0cba830b153bcea5021e684c7276d7c1114a9750a8ed3f8bd362c7fc26a5c7b51d5582fc76ac154e2309cddd7b79bdac0f6b413aee983ee27616b698431481b2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CollaborativeStorageAdapterModule-0cba830b153bcea5021e684c7276d7c1114a9750a8ed3f8bd362c7fc26a5c7b51d5582fc76ac154e2309cddd7b79bdac0f6b413aee983ee27616b698431481b2"' :
                                        'id="xs-injectables-links-module-CollaborativeStorageAdapterModule-0cba830b153bcea5021e684c7276d7c1114a9750a8ed3f8bd362c7fc26a5c7b51d5582fc76ac154e2309cddd7b79bdac0f6b413aee983ee27616b698431481b2"' }>
                                        <li class="link">
                                            <a href="injectables/CollaborativeStorageAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CollaborativeStorageAdapter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CollaborativeStorageAdapterMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CollaborativeStorageAdapterMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LtiToolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LtiToolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NextcloudClient.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NextcloudClient</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NextcloudStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NextcloudStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PseudonymsRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PseudonymsRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CollaborativeStorageModule.html" data-type="entity-link" >CollaborativeStorageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CollaborativeStorageModule-2d9e18e16074ceaebafcc44487bf92b72658c787162e3d5835fad3980f422439c8843b1768b56c622ed5d3b5d893a47f5c0d1254b0db1424a7042e883d574aec"' : 'data-target="#xs-controllers-links-module-CollaborativeStorageModule-2d9e18e16074ceaebafcc44487bf92b72658c787162e3d5835fad3980f422439c8843b1768b56c622ed5d3b5d893a47f5c0d1254b0db1424a7042e883d574aec"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CollaborativeStorageModule-2d9e18e16074ceaebafcc44487bf92b72658c787162e3d5835fad3980f422439c8843b1768b56c622ed5d3b5d893a47f5c0d1254b0db1424a7042e883d574aec"' :
                                            'id="xs-controllers-links-module-CollaborativeStorageModule-2d9e18e16074ceaebafcc44487bf92b72658c787162e3d5835fad3980f422439c8843b1768b56c622ed5d3b5d893a47f5c0d1254b0db1424a7042e883d574aec"' }>
                                            <li class="link">
                                                <a href="controllers/CollaborativeStorageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CollaborativeStorageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CollaborativeStorageModule-2d9e18e16074ceaebafcc44487bf92b72658c787162e3d5835fad3980f422439c8843b1768b56c622ed5d3b5d893a47f5c0d1254b0db1424a7042e883d574aec"' : 'data-target="#xs-injectables-links-module-CollaborativeStorageModule-2d9e18e16074ceaebafcc44487bf92b72658c787162e3d5835fad3980f422439c8843b1768b56c622ed5d3b5d893a47f5c0d1254b0db1424a7042e883d574aec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CollaborativeStorageModule-2d9e18e16074ceaebafcc44487bf92b72658c787162e3d5835fad3980f422439c8843b1768b56c622ed5d3b5d893a47f5c0d1254b0db1424a7042e883d574aec"' :
                                        'id="xs-injectables-links-module-CollaborativeStorageModule-2d9e18e16074ceaebafcc44487bf92b72658c787162e3d5835fad3980f422439c8843b1768b56c622ed5d3b5d893a47f5c0d1254b0db1424a7042e883d574aec"' }>
                                        <li class="link">
                                            <a href="injectables/CollaborativeStorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CollaborativeStorageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CollaborativeStorageUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CollaborativeStorageUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeamMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeamPermissionsMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamPermissionsMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeamsRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsRepo</a>
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
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ErrorModule-ce7b2f19799ac0b3be0dd5d77fab325f5289100408a4e770268900c433bb95f5e9018099807b53e75b7403a05b43863b631ac1ce4bd90146001efe666df8f509"' : 'data-target="#xs-injectables-links-module-ErrorModule-ce7b2f19799ac0b3be0dd5d77fab325f5289100408a4e770268900c433bb95f5e9018099807b53e75b7403a05b43863b631ac1ce4bd90146001efe666df8f509"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ErrorModule-ce7b2f19799ac0b3be0dd5d77fab325f5289100408a4e770268900c433bb95f5e9018099807b53e75b7403a05b43863b631ac1ce4bd90146001efe666df8f509"' :
                                        'id="xs-injectables-links-module-ErrorModule-ce7b2f19799ac0b3be0dd5d77fab325f5289100408a4e770268900c433bb95f5e9018099807b53e75b7403a05b43863b631ac1ce4bd90146001efe666df8f509"' }>
                                        <li class="link">
                                            <a href="injectables/Logger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Logger</a>
                                        </li>
                                    </ul>
                                </li>
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
                                        'data-target="#injectables-links-module-FilesModule-912ae3c8bd6eb6087afa5f908008db1e16075608f956fbbe8d20da4816a473d50f8c7a8541ab432140b1d07fa038ed759d97c752329e681759bc798e11c3f819"' : 'data-target="#xs-injectables-links-module-FilesModule-912ae3c8bd6eb6087afa5f908008db1e16075608f956fbbe8d20da4816a473d50f8c7a8541ab432140b1d07fa038ed759d97c752329e681759bc798e11c3f819"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-912ae3c8bd6eb6087afa5f908008db1e16075608f956fbbe8d20da4816a473d50f8c7a8541ab432140b1d07fa038ed759d97c752329e681759bc798e11c3f819"' :
                                        'id="xs-injectables-links-module-FilesModule-912ae3c8bd6eb6087afa5f908008db1e16075608f956fbbe8d20da4816a473d50f8c7a8541ab432140b1d07fa038ed759d97c752329e681759bc798e11c3f819"' }>
                                        <li class="link">
                                            <a href="injectables/DeleteFilesUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteFilesUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeleteOrphanedFilesUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteOrphanedFilesUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmbeddedFilesRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmbeddedFilesRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileRecordRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileRecordRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileStorageAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileStorageAdapter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrphanedFilesRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrphanedFilesRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StorageProviderRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageProviderRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SyncEmbeddedFilesUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SyncEmbeddedFilesUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SyncFilesMetadataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SyncFilesMetadataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SyncFilesRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SyncFilesRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SyncFilesStorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SyncFilesStorageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SyncFilesUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SyncFilesUc</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesStorageAMQPModule.html" data-type="entity-link" >FilesStorageAMQPModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesStorageAMQPModule-c3ff9bc1d4566991c94bb3c4a05cc3dcba91e37eb32de28080e4d1869268256a630d0d2caa9d5adb46c1852028e5a2a62430ac2cd7c2c93495042d70b168c617"' : 'data-target="#xs-injectables-links-module-FilesStorageAMQPModule-c3ff9bc1d4566991c94bb3c4a05cc3dcba91e37eb32de28080e4d1869268256a630d0d2caa9d5adb46c1852028e5a2a62430ac2cd7c2c93495042d70b168c617"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesStorageAMQPModule-c3ff9bc1d4566991c94bb3c4a05cc3dcba91e37eb32de28080e4d1869268256a630d0d2caa9d5adb46c1852028e5a2a62430ac2cd7c2c93495042d70b168c617"' :
                                        'id="xs-injectables-links-module-FilesStorageAMQPModule-c3ff9bc1d4566991c94bb3c4a05cc3dcba91e37eb32de28080e4d1869268256a630d0d2caa9d5adb46c1852028e5a2a62430ac2cd7c2c93495042d70b168c617"' }>
                                        <li class="link">
                                            <a href="injectables/FilesStorageConsumer.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesStorageConsumer</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesStorageApiModule.html" data-type="entity-link" >FilesStorageApiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FilesStorageApiModule-09aed7b56b825a089d70772f8e23186c9f55c333ca81702ee9f180eea7e53a64e628d8954ec609246896b4873c9cab61b9afda81124cdaffb0379c759fa52151"' : 'data-target="#xs-controllers-links-module-FilesStorageApiModule-09aed7b56b825a089d70772f8e23186c9f55c333ca81702ee9f180eea7e53a64e628d8954ec609246896b4873c9cab61b9afda81124cdaffb0379c759fa52151"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesStorageApiModule-09aed7b56b825a089d70772f8e23186c9f55c333ca81702ee9f180eea7e53a64e628d8954ec609246896b4873c9cab61b9afda81124cdaffb0379c759fa52151"' :
                                            'id="xs-controllers-links-module-FilesStorageApiModule-09aed7b56b825a089d70772f8e23186c9f55c333ca81702ee9f180eea7e53a64e628d8954ec609246896b4873c9cab61b9afda81124cdaffb0379c759fa52151"' }>
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
                                        'data-target="#injectables-links-module-FilesStorageApiModule-09aed7b56b825a089d70772f8e23186c9f55c333ca81702ee9f180eea7e53a64e628d8954ec609246896b4873c9cab61b9afda81124cdaffb0379c759fa52151"' : 'data-target="#xs-injectables-links-module-FilesStorageApiModule-09aed7b56b825a089d70772f8e23186c9f55c333ca81702ee9f180eea7e53a64e628d8954ec609246896b4873c9cab61b9afda81124cdaffb0379c759fa52151"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesStorageApiModule-09aed7b56b825a089d70772f8e23186c9f55c333ca81702ee9f180eea7e53a64e628d8954ec609246896b4873c9cab61b9afda81124cdaffb0379c759fa52151"' :
                                        'id="xs-injectables-links-module-FilesStorageApiModule-09aed7b56b825a089d70772f8e23186c9f55c333ca81702ee9f180eea7e53a64e628d8954ec609246896b4873c9cab61b9afda81124cdaffb0379c759fa52151"' }>
                                        <li class="link">
                                            <a href="injectables/FilesStorageUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesStorageUC</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesStorageClientModule.html" data-type="entity-link" >FilesStorageClientModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesStorageClientModule-037a5971d79ed0408aa939cc293fae2c3c5251823a165f178ebf111443ab704a6516448fad6cd6e850fcb253423744781ba11f3cb19fece46cbea25bda70d7d1"' : 'data-target="#xs-injectables-links-module-FilesStorageClientModule-037a5971d79ed0408aa939cc293fae2c3c5251823a165f178ebf111443ab704a6516448fad6cd6e850fcb253423744781ba11f3cb19fece46cbea25bda70d7d1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesStorageClientModule-037a5971d79ed0408aa939cc293fae2c3c5251823a165f178ebf111443ab704a6516448fad6cd6e850fcb253423744781ba11f3cb19fece46cbea25bda70d7d1"' :
                                        'id="xs-injectables-links-module-FilesStorageClientModule-037a5971d79ed0408aa939cc293fae2c3c5251823a165f178ebf111443ab704a6516448fad6cd6e850fcb253423744781ba11f3cb19fece46cbea25bda70d7d1"' }>
                                        <li class="link">
                                            <a href="injectables/CopyFilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CopyFilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesStorageClientAdapterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesStorageClientAdapterService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesStorageProducer.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesStorageProducer</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesStorageModule.html" data-type="entity-link" >FilesStorageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesStorageModule-48277018e3c4783e027dac23968839f1228b4ec7ec79942d43287351c419de791f9e3300768a41155fd386dc6ca25eb2cb2ceddb3526191c0bf47b59f2dce015"' : 'data-target="#xs-injectables-links-module-FilesStorageModule-48277018e3c4783e027dac23968839f1228b4ec7ec79942d43287351c419de791f9e3300768a41155fd386dc6ca25eb2cb2ceddb3526191c0bf47b59f2dce015"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesStorageModule-48277018e3c4783e027dac23968839f1228b4ec7ec79942d43287351c419de791f9e3300768a41155fd386dc6ca25eb2cb2ceddb3526191c0bf47b59f2dce015"' :
                                        'id="xs-injectables-links-module-FilesStorageModule-48277018e3c4783e027dac23968839f1228b4ec7ec79942d43287351c419de791f9e3300768a41155fd386dc6ca25eb2cb2ceddb3526191c0bf47b59f2dce015"' }>
                                        <li class="link">
                                            <a href="injectables/FileRecordRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileRecordRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FilesStorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesStorageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/S3ClientAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >S3ClientAdapter</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesStorageTestModule.html" data-type="entity-link" >FilesStorageTestModule</a>
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
                                            'data-target="#controllers-links-module-ImportUserModule-843c874bbc01a20903516ab2b6f160f21f2bf99dde6a9e2486003ede987b093514500132919c3c56b674e0999078043a60f93bf90aa8aab127297043d1b76311"' : 'data-target="#xs-controllers-links-module-ImportUserModule-843c874bbc01a20903516ab2b6f160f21f2bf99dde6a9e2486003ede987b093514500132919c3c56b674e0999078043a60f93bf90aa8aab127297043d1b76311"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ImportUserModule-843c874bbc01a20903516ab2b6f160f21f2bf99dde6a9e2486003ede987b093514500132919c3c56b674e0999078043a60f93bf90aa8aab127297043d1b76311"' :
                                            'id="xs-controllers-links-module-ImportUserModule-843c874bbc01a20903516ab2b6f160f21f2bf99dde6a9e2486003ede987b093514500132919c3c56b674e0999078043a60f93bf90aa8aab127297043d1b76311"' }>
                                            <li class="link">
                                                <a href="controllers/ImportUserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportUserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ImportUserModule-843c874bbc01a20903516ab2b6f160f21f2bf99dde6a9e2486003ede987b093514500132919c3c56b674e0999078043a60f93bf90aa8aab127297043d1b76311"' : 'data-target="#xs-injectables-links-module-ImportUserModule-843c874bbc01a20903516ab2b6f160f21f2bf99dde6a9e2486003ede987b093514500132919c3c56b674e0999078043a60f93bf90aa8aab127297043d1b76311"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImportUserModule-843c874bbc01a20903516ab2b6f160f21f2bf99dde6a9e2486003ede987b093514500132919c3c56b674e0999078043a60f93bf90aa8aab127297043d1b76311"' :
                                        'id="xs-injectables-links-module-ImportUserModule-843c874bbc01a20903516ab2b6f160f21f2bf99dde6a9e2486003ede987b093514500132919c3c56b674e0999078043a60f93bf90aa8aab127297043d1b76311"' }>
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
                                <a href="modules/KeycloakControllerModule.html" data-type="entity-link" >KeycloakControllerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-KeycloakControllerModule-e9960b06ff0de9aec5080a837a14b8acf4f66c9f0c4f768fb32a0a80cd35d727db4c17a957995aa82659f1373e86d2a07f85ffac4384ad94a73028fc0c62619b"' : 'data-target="#xs-controllers-links-module-KeycloakControllerModule-e9960b06ff0de9aec5080a837a14b8acf4f66c9f0c4f768fb32a0a80cd35d727db4c17a957995aa82659f1373e86d2a07f85ffac4384ad94a73028fc0c62619b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-KeycloakControllerModule-e9960b06ff0de9aec5080a837a14b8acf4f66c9f0c4f768fb32a0a80cd35d727db4c17a957995aa82659f1373e86d2a07f85ffac4384ad94a73028fc0c62619b"' :
                                            'id="xs-controllers-links-module-KeycloakControllerModule-e9960b06ff0de9aec5080a837a14b8acf4f66c9f0c4f768fb32a0a80cd35d727db4c17a957995aa82659f1373e86d2a07f85ffac4384ad94a73028fc0c62619b"' }>
                                            <li class="link">
                                                <a href="controllers/KeycloakManagementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeycloakManagementController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/KeycloakModule.html" data-type="entity-link" >KeycloakModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-KeycloakModule-32359436e7648a786ba66657d055e93f2173798d4313b707923ed9f607b7fd2193d9dab12ac66ac14d787eeae3d0359af57e3e88f0da63fdfb0009ca03cb849f"' : 'data-target="#xs-injectables-links-module-KeycloakModule-32359436e7648a786ba66657d055e93f2173798d4313b707923ed9f607b7fd2193d9dab12ac66ac14d787eeae3d0359af57e3e88f0da63fdfb0009ca03cb849f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-KeycloakModule-32359436e7648a786ba66657d055e93f2173798d4313b707923ed9f607b7fd2193d9dab12ac66ac14d787eeae3d0359af57e3e88f0da63fdfb0009ca03cb849f"' :
                                        'id="xs-injectables-links-module-KeycloakModule-32359436e7648a786ba66657d055e93f2173798d4313b707923ed9f607b7fd2193d9dab12ac66ac14d787eeae3d0359af57e3e88f0da63fdfb0009ca03cb849f"' }>
                                        <li class="link">
                                            <a href="injectables/KeycloakAdministrationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeycloakAdministrationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/KeycloakManagementUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeycloakManagementUc</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LearnroomModule.html" data-type="entity-link" >LearnroomModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LearnroomModule-5f74d13043f599ec31e2ef826e591c2597ac4222e0ad7c32621456e5dca7b1e8a191933bb6ed4bf642c785774569ded23e75855e1800b8b47e4c473bfaf6c6d3"' : 'data-target="#xs-controllers-links-module-LearnroomModule-5f74d13043f599ec31e2ef826e591c2597ac4222e0ad7c32621456e5dca7b1e8a191933bb6ed4bf642c785774569ded23e75855e1800b8b47e4c473bfaf6c6d3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LearnroomModule-5f74d13043f599ec31e2ef826e591c2597ac4222e0ad7c32621456e5dca7b1e8a191933bb6ed4bf642c785774569ded23e75855e1800b8b47e4c473bfaf6c6d3"' :
                                            'id="xs-controllers-links-module-LearnroomModule-5f74d13043f599ec31e2ef826e591c2597ac4222e0ad7c32621456e5dca7b1e8a191933bb6ed4bf642c785774569ded23e75855e1800b8b47e4c473bfaf6c6d3"' }>
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
                                        'data-target="#injectables-links-module-LearnroomModule-5f74d13043f599ec31e2ef826e591c2597ac4222e0ad7c32621456e5dca7b1e8a191933bb6ed4bf642c785774569ded23e75855e1800b8b47e4c473bfaf6c6d3"' : 'data-target="#xs-injectables-links-module-LearnroomModule-5f74d13043f599ec31e2ef826e591c2597ac4222e0ad7c32621456e5dca7b1e8a191933bb6ed4bf642c785774569ded23e75855e1800b8b47e4c473bfaf6c6d3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LearnroomModule-5f74d13043f599ec31e2ef826e591c2597ac4222e0ad7c32621456e5dca7b1e8a191933bb6ed4bf642c785774569ded23e75855e1800b8b47e4c473bfaf6c6d3"' :
                                        'id="xs-injectables-links-module-LearnroomModule-5f74d13043f599ec31e2ef826e591c2597ac4222e0ad7c32621456e5dca7b1e8a191933bb6ed4bf642c785774569ded23e75855e1800b8b47e4c473bfaf6c6d3"' }>
                                        <li class="link">
                                            <a href="injectables/BoardCopyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardCopyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BoardRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommonCartridgeExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommonCartridgeExportService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CopyHelperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CopyHelperService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseCopyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseCopyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseCopyUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseCopyUC</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseEntityCopyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseEntityCopyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseExportUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseExportUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseService</a>
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
                                            <a href="injectables/EtherpadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EtherpadService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FeathersServiceProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeathersServiceProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileCopyAppendService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileCopyAppendService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileLegacyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileLegacyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LessonCopyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonCopyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LessonCopyUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonCopyUC</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LessonRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Logger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Logger</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MetadataLoader.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetadataLoader</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NexboardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NexboardService</a>
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
                                            <a href="injectables/RoomsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomsUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskCopyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskCopyService</a>
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
                                <a href="modules/LessonApiModule.html" data-type="entity-link" >LessonApiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LessonApiModule-d444c8a14b34243a88e30b4b68e7eb946a98ee5dd2a517409b53412591694ddabc13ce8b37b7f96d4ac0458e8d9cbd3d236f838fc6c108a7076ec9de4dfe9bf5"' : 'data-target="#xs-controllers-links-module-LessonApiModule-d444c8a14b34243a88e30b4b68e7eb946a98ee5dd2a517409b53412591694ddabc13ce8b37b7f96d4ac0458e8d9cbd3d236f838fc6c108a7076ec9de4dfe9bf5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LessonApiModule-d444c8a14b34243a88e30b4b68e7eb946a98ee5dd2a517409b53412591694ddabc13ce8b37b7f96d4ac0458e8d9cbd3d236f838fc6c108a7076ec9de4dfe9bf5"' :
                                            'id="xs-controllers-links-module-LessonApiModule-d444c8a14b34243a88e30b4b68e7eb946a98ee5dd2a517409b53412591694ddabc13ce8b37b7f96d4ac0458e8d9cbd3d236f838fc6c108a7076ec9de4dfe9bf5"' }>
                                            <li class="link">
                                                <a href="controllers/LessonController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LessonApiModule-d444c8a14b34243a88e30b4b68e7eb946a98ee5dd2a517409b53412591694ddabc13ce8b37b7f96d4ac0458e8d9cbd3d236f838fc6c108a7076ec9de4dfe9bf5"' : 'data-target="#xs-injectables-links-module-LessonApiModule-d444c8a14b34243a88e30b4b68e7eb946a98ee5dd2a517409b53412591694ddabc13ce8b37b7f96d4ac0458e8d9cbd3d236f838fc6c108a7076ec9de4dfe9bf5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LessonApiModule-d444c8a14b34243a88e30b4b68e7eb946a98ee5dd2a517409b53412591694ddabc13ce8b37b7f96d4ac0458e8d9cbd3d236f838fc6c108a7076ec9de4dfe9bf5"' :
                                        'id="xs-injectables-links-module-LessonApiModule-d444c8a14b34243a88e30b4b68e7eb946a98ee5dd2a517409b53412591694ddabc13ce8b37b7f96d4ac0458e8d9cbd3d236f838fc6c108a7076ec9de4dfe9bf5"' }>
                                        <li class="link">
                                            <a href="injectables/LessonUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonUC</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LessonModule.html" data-type="entity-link" >LessonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LessonModule-c4fb9e7a3542d253b97f21097ee04176c38d260f5dfdacda1810f801fbd7c5681687813538f593360df63cbae0d52fd8a4c20b859cfffc41ae60bea09610f55c"' : 'data-target="#xs-injectables-links-module-LessonModule-c4fb9e7a3542d253b97f21097ee04176c38d260f5dfdacda1810f801fbd7c5681687813538f593360df63cbae0d52fd8a4c20b859cfffc41ae60bea09610f55c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LessonModule-c4fb9e7a3542d253b97f21097ee04176c38d260f5dfdacda1810f801fbd7c5681687813538f593360df63cbae0d52fd8a4c20b859cfffc41ae60bea09610f55c"' :
                                        'id="xs-injectables-links-module-LessonModule-c4fb9e7a3542d253b97f21097ee04176c38d260f5dfdacda1810f801fbd7c5681687813538f593360df63cbae0d52fd8a4c20b859cfffc41ae60bea09610f55c"' }>
                                        <li class="link">
                                            <a href="injectables/LessonRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LessonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoggerModule-b6de9f29ee7cab8739b50aea2825df77be32fbca6d18329933b9ba4c1bfdb328f69d01f917518c152f7a583c980981a6b31d68da3bd89037cc351152d5c48e85"' : 'data-target="#xs-injectables-links-module-LoggerModule-b6de9f29ee7cab8739b50aea2825df77be32fbca6d18329933b9ba4c1bfdb328f69d01f917518c152f7a583c980981a6b31d68da3bd89037cc351152d5c48e85"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-b6de9f29ee7cab8739b50aea2825df77be32fbca6d18329933b9ba4c1bfdb328f69d01f917518c152f7a583c980981a6b31d68da3bd89037cc351152d5c48e85"' :
                                        'id="xs-injectables-links-module-LoggerModule-b6de9f29ee7cab8739b50aea2825df77be32fbca6d18329933b9ba4c1bfdb328f69d01f917518c152f7a583c980981a6b31d68da3bd89037cc351152d5c48e85"' }>
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
                                            'data-target="#controllers-links-module-ManagementModule-6d035207ea9c05890ffaaf107d6b92e39ea846ffebc1e18ea65124bc805d4a183bc1b14b73419215866c1c05da84002b1d514f7007259266380c8bad22e79c85"' : 'data-target="#xs-controllers-links-module-ManagementModule-6d035207ea9c05890ffaaf107d6b92e39ea846ffebc1e18ea65124bc805d4a183bc1b14b73419215866c1c05da84002b1d514f7007259266380c8bad22e79c85"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ManagementModule-6d035207ea9c05890ffaaf107d6b92e39ea846ffebc1e18ea65124bc805d4a183bc1b14b73419215866c1c05da84002b1d514f7007259266380c8bad22e79c85"' :
                                            'id="xs-controllers-links-module-ManagementModule-6d035207ea9c05890ffaaf107d6b92e39ea846ffebc1e18ea65124bc805d4a183bc1b14b73419215866c1c05da84002b1d514f7007259266380c8bad22e79c85"' }>
                                            <li class="link">
                                                <a href="controllers/DatabaseManagementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseManagementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ManagementModule-6d035207ea9c05890ffaaf107d6b92e39ea846ffebc1e18ea65124bc805d4a183bc1b14b73419215866c1c05da84002b1d514f7007259266380c8bad22e79c85"' : 'data-target="#xs-injectables-links-module-ManagementModule-6d035207ea9c05890ffaaf107d6b92e39ea846ffebc1e18ea65124bc805d4a183bc1b14b73419215866c1c05da84002b1d514f7007259266380c8bad22e79c85"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManagementModule-6d035207ea9c05890ffaaf107d6b92e39ea846ffebc1e18ea65124bc805d4a183bc1b14b73419215866c1c05da84002b1d514f7007259266380c8bad22e79c85"' :
                                        'id="xs-injectables-links-module-ManagementModule-6d035207ea9c05890ffaaf107d6b92e39ea846ffebc1e18ea65124bc805d4a183bc1b14b73419215866c1c05da84002b1d514f7007259266380c8bad22e79c85"' }>
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
                                <a href="modules/ManagementServerModule.html" data-type="entity-link" >ManagementServerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ManagementServerTestModule.html" data-type="entity-link" >ManagementServerTestModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MongoMemoryDatabaseModule.html" data-type="entity-link" >MongoMemoryDatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewsModule.html" data-type="entity-link" >NewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-NewsModule-eb7967c93e536a93d629a6443d8b0683677c4ddada740c4172417a339a7e6e993ec5b1dec64f65f935d24ee57484666c1ed775e74f87b7dce5fda711c7db950b"' : 'data-target="#xs-controllers-links-module-NewsModule-eb7967c93e536a93d629a6443d8b0683677c4ddada740c4172417a339a7e6e993ec5b1dec64f65f935d24ee57484666c1ed775e74f87b7dce5fda711c7db950b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NewsModule-eb7967c93e536a93d629a6443d8b0683677c4ddada740c4172417a339a7e6e993ec5b1dec64f65f935d24ee57484666c1ed775e74f87b7dce5fda711c7db950b"' :
                                            'id="xs-controllers-links-module-NewsModule-eb7967c93e536a93d629a6443d8b0683677c4ddada740c4172417a339a7e6e993ec5b1dec64f65f935d24ee57484666c1ed775e74f87b7dce5fda711c7db950b"' }>
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
                                        'data-target="#injectables-links-module-NewsModule-eb7967c93e536a93d629a6443d8b0683677c4ddada740c4172417a339a7e6e993ec5b1dec64f65f935d24ee57484666c1ed775e74f87b7dce5fda711c7db950b"' : 'data-target="#xs-injectables-links-module-NewsModule-eb7967c93e536a93d629a6443d8b0683677c4ddada740c4172417a339a7e6e993ec5b1dec64f65f935d24ee57484666c1ed775e74f87b7dce5fda711c7db950b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NewsModule-eb7967c93e536a93d629a6443d8b0683677c4ddada740c4172417a339a7e6e993ec5b1dec64f65f935d24ee57484666c1ed775e74f87b7dce5fda711c7db950b"' :
                                        'id="xs-injectables-links-module-NewsModule-eb7967c93e536a93d629a6443d8b0683677c4ddada740c4172417a339a7e6e993ec5b1dec64f65f935d24ee57484666c1ed775e74f87b7dce5fda711c7db950b"' }>
                                        <li class="link">
                                            <a href="injectables/Logger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Logger</a>
                                        </li>
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
                                            'data-target="#controllers-links-module-OauthModule-e60b48817e007404037156a4e6ad1fce60ba0fb519baa1007fe349521a51b82925fbb43149e314fd1546b4b8b6a0b3d3982caa4268cffa46a133e4f57917a6c1"' : 'data-target="#xs-controllers-links-module-OauthModule-e60b48817e007404037156a4e6ad1fce60ba0fb519baa1007fe349521a51b82925fbb43149e314fd1546b4b8b6a0b3d3982caa4268cffa46a133e4f57917a6c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OauthModule-e60b48817e007404037156a4e6ad1fce60ba0fb519baa1007fe349521a51b82925fbb43149e314fd1546b4b8b6a0b3d3982caa4268cffa46a133e4f57917a6c1"' :
                                            'id="xs-controllers-links-module-OauthModule-e60b48817e007404037156a4e6ad1fce60ba0fb519baa1007fe349521a51b82925fbb43149e314fd1546b4b8b6a0b3d3982caa4268cffa46a133e4f57917a6c1"' }>
                                            <li class="link">
                                                <a href="controllers/OauthSSOController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthSSOController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OauthModule-e60b48817e007404037156a4e6ad1fce60ba0fb519baa1007fe349521a51b82925fbb43149e314fd1546b4b8b6a0b3d3982caa4268cffa46a133e4f57917a6c1"' : 'data-target="#xs-injectables-links-module-OauthModule-e60b48817e007404037156a4e6ad1fce60ba0fb519baa1007fe349521a51b82925fbb43149e314fd1546b4b8b6a0b3d3982caa4268cffa46a133e4f57917a6c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OauthModule-e60b48817e007404037156a4e6ad1fce60ba0fb519baa1007fe349521a51b82925fbb43149e314fd1546b4b8b6a0b3d3982caa4268cffa46a133e4f57917a6c1"' :
                                        'id="xs-injectables-links-module-OauthModule-e60b48817e007404037156a4e6ad1fce60ba0fb519baa1007fe349521a51b82925fbb43149e314fd1546b4b8b6a0b3d3982caa4268cffa46a133e4f57917a6c1"' }>
                                        <li class="link">
                                            <a href="injectables/HydraOauthUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HydraOauthUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HydraSsoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HydraSsoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LtiToolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LtiToolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OauthProviderModule.html" data-type="entity-link" >OauthProviderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OauthProviderModule-4589ad27d75b948b0c4151e32d74ef415552d3e56b043a2b412cf69095b0e0d487eeebe3eedd33f9ef13b94630177b780d34a1bee2d8b709e84634e433864084"' : 'data-target="#xs-controllers-links-module-OauthProviderModule-4589ad27d75b948b0c4151e32d74ef415552d3e56b043a2b412cf69095b0e0d487eeebe3eedd33f9ef13b94630177b780d34a1bee2d8b709e84634e433864084"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OauthProviderModule-4589ad27d75b948b0c4151e32d74ef415552d3e56b043a2b412cf69095b0e0d487eeebe3eedd33f9ef13b94630177b780d34a1bee2d8b709e84634e433864084"' :
                                            'id="xs-controllers-links-module-OauthProviderModule-4589ad27d75b948b0c4151e32d74ef415552d3e56b043a2b412cf69095b0e0d487eeebe3eedd33f9ef13b94630177b780d34a1bee2d8b709e84634e433864084"' }>
                                            <li class="link">
                                                <a href="controllers/OauthProviderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthProviderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OauthProviderModule-4589ad27d75b948b0c4151e32d74ef415552d3e56b043a2b412cf69095b0e0d487eeebe3eedd33f9ef13b94630177b780d34a1bee2d8b709e84634e433864084"' : 'data-target="#xs-injectables-links-module-OauthProviderModule-4589ad27d75b948b0c4151e32d74ef415552d3e56b043a2b412cf69095b0e0d487eeebe3eedd33f9ef13b94630177b780d34a1bee2d8b709e84634e433864084"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OauthProviderModule-4589ad27d75b948b0c4151e32d74ef415552d3e56b043a2b412cf69095b0e0d487eeebe3eedd33f9ef13b94630177b780d34a1bee2d8b709e84634e433864084"' :
                                        'id="xs-injectables-links-module-OauthProviderModule-4589ad27d75b948b0c4151e32d74ef415552d3e56b043a2b412cf69095b0e0d487eeebe3eedd33f9ef13b94630177b780d34a1bee2d8b709e84634e433864084"' }>
                                        <li class="link">
                                            <a href="injectables/IdTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IdTokenService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LtiToolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LtiToolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthProviderClientCrudUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthProviderClientCrudUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthProviderConsentFlowUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthProviderConsentFlowUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthProviderLoginFlowService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthProviderLoginFlowService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthProviderLoginFlowUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthProviderLoginFlowUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthProviderLogoutFlowUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthProviderLogoutFlowUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthProviderRequestMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthProviderRequestMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthProviderResponseMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthProviderResponseMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthProviderUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthProviderUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PseudonymsRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PseudonymsRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeamsRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OauthProviderServiceModule.html" data-type="entity-link" >OauthProviderServiceModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProvisioningModule.html" data-type="entity-link" >ProvisioningModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProvisioningModule-56f871c34cda75c3f065836d813a70accc3d75a57c5e1c2af748ef7d207d00667b2e4881b5ded3b4d367899706c2518ce11dfbe1833f045efba6d25c1a8b1bb8"' : 'data-target="#xs-injectables-links-module-ProvisioningModule-56f871c34cda75c3f065836d813a70accc3d75a57c5e1c2af748ef7d207d00667b2e4881b5ded3b4d367899706c2518ce11dfbe1833f045efba6d25c1a8b1bb8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProvisioningModule-56f871c34cda75c3f065836d813a70accc3d75a57c5e1c2af748ef7d207d00667b2e4881b5ded3b4d367899706c2518ce11dfbe1833f045efba6d25c1a8b1bb8"' :
                                        'id="xs-injectables-links-module-ProvisioningModule-56f871c34cda75c3f065836d813a70accc3d75a57c5e1c2af748ef7d207d00667b2e4881b5ded3b4d367899706c2518ce11dfbe1833f045efba6d25c1a8b1bb8"' }>
                                        <li class="link">
                                            <a href="injectables/IservProvisioningStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IservProvisioningStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Logger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Logger</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OidcProvisioningStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OidcProvisioningStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProvisioningService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProvisioningService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SanisProvisioningStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SanisProvisioningStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SanisResponseMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SanisResponseMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SanisSchoolService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SanisSchoolService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SanisUserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SanisUserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserDORepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDORepo</a>
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
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoleModule-b15dc23623a229ebc1328893eba02fe182785d80ccda8dd3942dd81ca29907f49e8c286e102cfd644ab8ce587ccde255fecd8ad767a008559a1fc46c17571994"' : 'data-target="#xs-injectables-links-module-RoleModule-b15dc23623a229ebc1328893eba02fe182785d80ccda8dd3942dd81ca29907f49e8c286e102cfd644ab8ce587ccde255fecd8ad767a008559a1fc46c17571994"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-b15dc23623a229ebc1328893eba02fe182785d80ccda8dd3942dd81ca29907f49e8c286e102cfd644ab8ce587ccde255fecd8ad767a008559a1fc46c17571994"' :
                                        'id="xs-injectables-links-module-RoleModule-b15dc23623a229ebc1328893eba02fe182785d80ccda8dd3942dd81ca29907f49e8c286e102cfd644ab8ce587ccde255fecd8ad767a008559a1fc46c17571994"' }>
                                        <li class="link">
                                            <a href="injectables/RoleRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleUc</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolModule.html" data-type="entity-link" >SchoolModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SchoolModule-f88dea87013ac178407c9f1a82e7d059d126936c758b6e36e21241f3170c14f8524220ee0e2efd0cf682756a258f662fb969ad7d594f1a9f2297597552850bc5"' : 'data-target="#xs-injectables-links-module-SchoolModule-f88dea87013ac178407c9f1a82e7d059d126936c758b6e36e21241f3170c14f8524220ee0e2efd0cf682756a258f662fb969ad7d594f1a9f2297597552850bc5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SchoolModule-f88dea87013ac178407c9f1a82e7d059d126936c758b6e36e21241f3170c14f8524220ee0e2efd0cf682756a258f662fb969ad7d594f1a9f2297597552850bc5"' :
                                        'id="xs-injectables-links-module-SchoolModule-f88dea87013ac178407c9f1a82e7d059d126936c758b6e36e21241f3170c14f8524220ee0e2efd0cf682756a258f662fb969ad7d594f1a9f2297597552850bc5"' }>
                                        <li class="link">
                                            <a href="injectables/SchoolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolUc</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServerConsoleModule.html" data-type="entity-link" >ServerConsoleModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServerModule.html" data-type="entity-link" >ServerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ServerModule-402ed5f402566cccb0d7bd92fdafddf904f68a189fc570bd1d39e428b884cb15550d00358faf9a513c5eba8a01bce233eb01bd1ae00cd292af1c8252388cd67f"' : 'data-target="#xs-controllers-links-module-ServerModule-402ed5f402566cccb0d7bd92fdafddf904f68a189fc570bd1d39e428b884cb15550d00358faf9a513c5eba8a01bce233eb01bd1ae00cd292af1c8252388cd67f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServerModule-402ed5f402566cccb0d7bd92fdafddf904f68a189fc570bd1d39e428b884cb15550d00358faf9a513c5eba8a01bce233eb01bd1ae00cd292af1c8252388cd67f"' :
                                            'id="xs-controllers-links-module-ServerModule-402ed5f402566cccb0d7bd92fdafddf904f68a189fc570bd1d39e428b884cb15550d00358faf9a513c5eba8a01bce233eb01bd1ae00cd292af1c8252388cd67f"' }>
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
                                            'data-target="#controllers-links-module-ServerTestModule-402ed5f402566cccb0d7bd92fdafddf904f68a189fc570bd1d39e428b884cb15550d00358faf9a513c5eba8a01bce233eb01bd1ae00cd292af1c8252388cd67f"' : 'data-target="#xs-controllers-links-module-ServerTestModule-402ed5f402566cccb0d7bd92fdafddf904f68a189fc570bd1d39e428b884cb15550d00358faf9a513c5eba8a01bce233eb01bd1ae00cd292af1c8252388cd67f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServerTestModule-402ed5f402566cccb0d7bd92fdafddf904f68a189fc570bd1d39e428b884cb15550d00358faf9a513c5eba8a01bce233eb01bd1ae00cd292af1c8252388cd67f"' :
                                            'id="xs-controllers-links-module-ServerTestModule-402ed5f402566cccb0d7bd92fdafddf904f68a189fc570bd1d39e428b884cb15550d00358faf9a513c5eba8a01bce233eb01bd1ae00cd292af1c8252388cd67f"' }>
                                            <li class="link">
                                                <a href="controllers/ServerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServerController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharingApiModule.html" data-type="entity-link" >SharingApiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SharingApiModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' : 'data-target="#xs-controllers-links-module-SharingApiModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SharingApiModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' :
                                            'id="xs-controllers-links-module-SharingApiModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' }>
                                            <li class="link">
                                                <a href="controllers/ShareTokenController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShareTokenController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharingApiModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' : 'data-target="#xs-injectables-links-module-SharingApiModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharingApiModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' :
                                        'id="xs-injectables-links-module-SharingApiModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' }>
                                        <li class="link">
                                            <a href="injectables/ShareTokenUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShareTokenUC</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharingModule.html" data-type="entity-link" >SharingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharingModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' : 'data-target="#xs-injectables-links-module-SharingModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharingModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' :
                                        'id="xs-injectables-links-module-SharingModule-d84d57a2bac1c394c10b798b51aa6cf738bbca13b78b2cbd909da710b8df0ca38c3867c0de32dddc9315bd6240ae1e9256a988342931e0b053397a2f9ad6472e"' }>
                                        <li class="link">
                                            <a href="injectables/CourseRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ShareTokenRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShareTokenRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ShareTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShareTokenService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokenGenerator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TokenGenerator</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SystemModule.html" data-type="entity-link" >SystemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SystemModule-d1b27a38607bf5c43caa69832eb7d8d0ffa2e9cdcfbb598a65969030fb08d1896e8fbdf70e8c552105b2602b67a1dabbc795e142173fb996d0e3e136abcb9c8e"' : 'data-target="#xs-controllers-links-module-SystemModule-d1b27a38607bf5c43caa69832eb7d8d0ffa2e9cdcfbb598a65969030fb08d1896e8fbdf70e8c552105b2602b67a1dabbc795e142173fb996d0e3e136abcb9c8e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SystemModule-d1b27a38607bf5c43caa69832eb7d8d0ffa2e9cdcfbb598a65969030fb08d1896e8fbdf70e8c552105b2602b67a1dabbc795e142173fb996d0e3e136abcb9c8e"' :
                                            'id="xs-controllers-links-module-SystemModule-d1b27a38607bf5c43caa69832eb7d8d0ffa2e9cdcfbb598a65969030fb08d1896e8fbdf70e8c552105b2602b67a1dabbc795e142173fb996d0e3e136abcb9c8e"' }>
                                            <li class="link">
                                                <a href="controllers/SystemController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SystemModule-d1b27a38607bf5c43caa69832eb7d8d0ffa2e9cdcfbb598a65969030fb08d1896e8fbdf70e8c552105b2602b67a1dabbc795e142173fb996d0e3e136abcb9c8e"' : 'data-target="#xs-injectables-links-module-SystemModule-d1b27a38607bf5c43caa69832eb7d8d0ffa2e9cdcfbb598a65969030fb08d1896e8fbdf70e8c552105b2602b67a1dabbc795e142173fb996d0e3e136abcb9c8e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SystemModule-d1b27a38607bf5c43caa69832eb7d8d0ffa2e9cdcfbb598a65969030fb08d1896e8fbdf70e8c552105b2602b67a1dabbc795e142173fb996d0e3e136abcb9c8e"' :
                                        'id="xs-injectables-links-module-SystemModule-d1b27a38607bf5c43caa69832eb7d8d0ffa2e9cdcfbb598a65969030fb08d1896e8fbdf70e8c552105b2602b67a1dabbc795e142173fb996d0e3e136abcb9c8e"' }>
                                        <li class="link">
                                            <a href="injectables/SystemRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SystemService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SystemUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemUc</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TaskModule-92bc11eab3634e56a3543bac8418ac656e24ae4273497c45a6b2c140d41f32a5d9c17a39d348cb68a2c406b23f49e4a0c605d3c757741b8631b268346231594e"' : 'data-target="#xs-controllers-links-module-TaskModule-92bc11eab3634e56a3543bac8418ac656e24ae4273497c45a6b2c140d41f32a5d9c17a39d348cb68a2c406b23f49e4a0c605d3c757741b8631b268346231594e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-92bc11eab3634e56a3543bac8418ac656e24ae4273497c45a6b2c140d41f32a5d9c17a39d348cb68a2c406b23f49e4a0c605d3c757741b8631b268346231594e"' :
                                            'id="xs-controllers-links-module-TaskModule-92bc11eab3634e56a3543bac8418ac656e24ae4273497c45a6b2c140d41f32a5d9c17a39d348cb68a2c406b23f49e4a0c605d3c757741b8631b268346231594e"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TaskModule-92bc11eab3634e56a3543bac8418ac656e24ae4273497c45a6b2c140d41f32a5d9c17a39d348cb68a2c406b23f49e4a0c605d3c757741b8631b268346231594e"' : 'data-target="#xs-injectables-links-module-TaskModule-92bc11eab3634e56a3543bac8418ac656e24ae4273497c45a6b2c140d41f32a5d9c17a39d348cb68a2c406b23f49e4a0c605d3c757741b8631b268346231594e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-92bc11eab3634e56a3543bac8418ac656e24ae4273497c45a6b2c140d41f32a5d9c17a39d348cb68a2c406b23f49e4a0c605d3c757741b8631b268346231594e"' :
                                        'id="xs-injectables-links-module-TaskModule-92bc11eab3634e56a3543bac8418ac656e24ae4273497c45a6b2c140d41f32a5d9c17a39d348cb68a2c406b23f49e4a0c605d3c757741b8631b268346231594e"' }>
                                        <li class="link">
                                            <a href="injectables/CopyHelperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CopyHelperService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FeathersServiceProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeathersServiceProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileCopyAppendService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileCopyAppendService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileLegacyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileLegacyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LessonRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Logger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Logger</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskCopyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskCopyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskCopyUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskCopyUC</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskUC.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskUC</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolApiModule.html" data-type="entity-link" >ToolApiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ToolApiModule-45c7bcd78967d3ef3c52e4e3d4bd03dc342e7865fa2a49ef32aa1ad61a52b0c36454e1ed402c53d6b975d761f3acb99049c31b814d2346def60838e56f0a0604"' : 'data-target="#xs-controllers-links-module-ToolApiModule-45c7bcd78967d3ef3c52e4e3d4bd03dc342e7865fa2a49ef32aa1ad61a52b0c36454e1ed402c53d6b975d761f3acb99049c31b814d2346def60838e56f0a0604"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ToolApiModule-45c7bcd78967d3ef3c52e4e3d4bd03dc342e7865fa2a49ef32aa1ad61a52b0c36454e1ed402c53d6b975d761f3acb99049c31b814d2346def60838e56f0a0604"' :
                                            'id="xs-controllers-links-module-ToolApiModule-45c7bcd78967d3ef3c52e4e3d4bd03dc342e7865fa2a49ef32aa1ad61a52b0c36454e1ed402c53d6b975d761f3acb99049c31b814d2346def60838e56f0a0604"' }>
                                            <li class="link">
                                                <a href="controllers/ToolController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ToolApiModule-45c7bcd78967d3ef3c52e4e3d4bd03dc342e7865fa2a49ef32aa1ad61a52b0c36454e1ed402c53d6b975d761f3acb99049c31b814d2346def60838e56f0a0604"' : 'data-target="#xs-injectables-links-module-ToolApiModule-45c7bcd78967d3ef3c52e4e3d4bd03dc342e7865fa2a49ef32aa1ad61a52b0c36454e1ed402c53d6b975d761f3acb99049c31b814d2346def60838e56f0a0604"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ToolApiModule-45c7bcd78967d3ef3c52e4e3d4bd03dc342e7865fa2a49ef32aa1ad61a52b0c36454e1ed402c53d6b975d761f3acb99049c31b814d2346def60838e56f0a0604"' :
                                        'id="xs-injectables-links-module-ToolApiModule-45c7bcd78967d3ef3c52e4e3d4bd03dc342e7865fa2a49ef32aa1ad61a52b0c36454e1ed402c53d6b975d761f3acb99049c31b814d2346def60838e56f0a0604"' }>
                                        <li class="link">
                                            <a href="injectables/ExternalToolRequestMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolRequestMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExternalToolResponseMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolResponseMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExternalToolUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Lti11ResponseMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Lti11ResponseMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Lti11Uc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Lti11Uc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LtiRoleMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LtiRoleMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LtiToolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LtiToolRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolModule.html" data-type="entity-link" >ToolModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ToolModule-991801ac36b04815631bd87f3285cbb73db489d2790b3596cd5b5ad58beaf238c6e395bbc9acbe5ecb055d20006f4293f9dd77a35480ef0f260991c479240698"' : 'data-target="#xs-controllers-links-module-ToolModule-991801ac36b04815631bd87f3285cbb73db489d2790b3596cd5b5ad58beaf238c6e395bbc9acbe5ecb055d20006f4293f9dd77a35480ef0f260991c479240698"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ToolModule-991801ac36b04815631bd87f3285cbb73db489d2790b3596cd5b5ad58beaf238c6e395bbc9acbe5ecb055d20006f4293f9dd77a35480ef0f260991c479240698"' :
                                            'id="xs-controllers-links-module-ToolModule-991801ac36b04815631bd87f3285cbb73db489d2790b3596cd5b5ad58beaf238c6e395bbc9acbe5ecb055d20006f4293f9dd77a35480ef0f260991c479240698"' }>
                                            <li class="link">
                                                <a href="controllers/ToolController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ToolModule-991801ac36b04815631bd87f3285cbb73db489d2790b3596cd5b5ad58beaf238c6e395bbc9acbe5ecb055d20006f4293f9dd77a35480ef0f260991c479240698"' : 'data-target="#xs-injectables-links-module-ToolModule-991801ac36b04815631bd87f3285cbb73db489d2790b3596cd5b5ad58beaf238c6e395bbc9acbe5ecb055d20006f4293f9dd77a35480ef0f260991c479240698"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ToolModule-991801ac36b04815631bd87f3285cbb73db489d2790b3596cd5b5ad58beaf238c6e395bbc9acbe5ecb055d20006f4293f9dd77a35480ef0f260991c479240698"' :
                                        'id="xs-injectables-links-module-ToolModule-991801ac36b04815631bd87f3285cbb73db489d2790b3596cd5b5ad58beaf238c6e395bbc9acbe5ecb055d20006f4293f9dd77a35480ef0f260991c479240698"' }>
                                        <li class="link">
                                            <a href="injectables/ExternalToolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExternalToolRepoMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolRepoMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExternalToolRequestMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolRequestMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExternalToolResponseMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolResponseMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExternalToolService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExternalToolSortingMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolSortingMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExternalToolUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExternalToolUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Lti11ResponseMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Lti11ResponseMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Lti11Service.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Lti11Service</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Lti11Uc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Lti11Uc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LtiRoleMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LtiRoleMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LtiToolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LtiToolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PseudonymsRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PseudonymsRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-bd1e404f70be0a9669879f2e8d0aedeee0028f23f849da4c2da1bfe614e70826b2f3871097d0cc6b982228fffb2dd17650633624fa9f23afc7f504b101320d71"' : 'data-target="#xs-controllers-links-module-UserModule-bd1e404f70be0a9669879f2e8d0aedeee0028f23f849da4c2da1bfe614e70826b2f3871097d0cc6b982228fffb2dd17650633624fa9f23afc7f504b101320d71"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-bd1e404f70be0a9669879f2e8d0aedeee0028f23f849da4c2da1bfe614e70826b2f3871097d0cc6b982228fffb2dd17650633624fa9f23afc7f504b101320d71"' :
                                            'id="xs-controllers-links-module-UserModule-bd1e404f70be0a9669879f2e8d0aedeee0028f23f849da4c2da1bfe614e70826b2f3871097d0cc6b982228fffb2dd17650633624fa9f23afc7f504b101320d71"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-bd1e404f70be0a9669879f2e8d0aedeee0028f23f849da4c2da1bfe614e70826b2f3871097d0cc6b982228fffb2dd17650633624fa9f23afc7f504b101320d71"' : 'data-target="#xs-injectables-links-module-UserModule-bd1e404f70be0a9669879f2e8d0aedeee0028f23f849da4c2da1bfe614e70826b2f3871097d0cc6b982228fffb2dd17650633624fa9f23afc7f504b101320d71"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-bd1e404f70be0a9669879f2e8d0aedeee0028f23f849da4c2da1bfe614e70826b2f3871097d0cc6b982228fffb2dd17650633624fa9f23afc7f504b101320d71"' :
                                        'id="xs-injectables-links-module-UserModule-bd1e404f70be0a9669879f2e8d0aedeee0028f23f849da4c2da1bfe614e70826b2f3871097d0cc6b982228fffb2dd17650633624fa9f23afc7f504b101320d71"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleUc</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserUc</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ValidationModule.html" data-type="entity-link" >ValidationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/VideoConferenceModule.html" data-type="entity-link" >VideoConferenceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-VideoConferenceModule-dd5b1ced2a7d96b621032e32ba63c5b317509ad47cc5c74ecaa9a53720c25c6b2bfc11f2c93015fa53dc890e788235d3bd7018dec111a021e455f4abbf91f7fb"' : 'data-target="#xs-controllers-links-module-VideoConferenceModule-dd5b1ced2a7d96b621032e32ba63c5b317509ad47cc5c74ecaa9a53720c25c6b2bfc11f2c93015fa53dc890e788235d3bd7018dec111a021e455f4abbf91f7fb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VideoConferenceModule-dd5b1ced2a7d96b621032e32ba63c5b317509ad47cc5c74ecaa9a53720c25c6b2bfc11f2c93015fa53dc890e788235d3bd7018dec111a021e455f4abbf91f7fb"' :
                                            'id="xs-controllers-links-module-VideoConferenceModule-dd5b1ced2a7d96b621032e32ba63c5b317509ad47cc5c74ecaa9a53720c25c6b2bfc11f2c93015fa53dc890e788235d3bd7018dec111a021e455f4abbf91f7fb"' }>
                                            <li class="link">
                                                <a href="controllers/VideoConferenceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoConferenceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-VideoConferenceModule-dd5b1ced2a7d96b621032e32ba63c5b317509ad47cc5c74ecaa9a53720c25c6b2bfc11f2c93015fa53dc890e788235d3bd7018dec111a021e455f4abbf91f7fb"' : 'data-target="#xs-injectables-links-module-VideoConferenceModule-dd5b1ced2a7d96b621032e32ba63c5b317509ad47cc5c74ecaa9a53720c25c6b2bfc11f2c93015fa53dc890e788235d3bd7018dec111a021e455f4abbf91f7fb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VideoConferenceModule-dd5b1ced2a7d96b621032e32ba63c5b317509ad47cc5c74ecaa9a53720c25c6b2bfc11f2c93015fa53dc890e788235d3bd7018dec111a021e455f4abbf91f7fb"' :
                                        'id="xs-injectables-links-module-VideoConferenceModule-dd5b1ced2a7d96b621032e32ba63c5b317509ad47cc5c74ecaa9a53720c25c6b2bfc11f2c93015fa53dc890e788235d3bd7018dec111a021e455f4abbf91f7fb"' }>
                                        <li class="link">
                                            <a href="injectables/BBBService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BBBService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ConverterUtil.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConverterUtil</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeamsRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VideoConferenceRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoConferenceRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VideoConferenceResponseMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoConferenceResponseMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VideoConferenceUc.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoConferenceUc</a>
                                        </li>
                                    </ul>
                                </li>
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
                                    <a href="controllers/FileSecurityController.html" data-type="entity-link" >FileSecurityController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesStorageController.html" data-type="entity-link" >FilesStorageController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LessonController.html" data-type="entity-link" >LessonController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SystemController.html" data-type="entity-link" >SystemController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TaskController.html" data-type="entity-link" >TaskController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/VideoConferenceController.html" data-type="entity-link" >VideoConferenceController</a>
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
                                    <a href="entities/Board.html" data-type="entity-link" >Board</a>
                                </li>
                                <li class="link">
                                    <a href="entities/BoardElement.html" data-type="entity-link" >BoardElement</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Course.html" data-type="entity-link" >Course</a>
                                </li>
                                <li class="link">
                                    <a href="entities/CourseExternalTool.html" data-type="entity-link" >CourseExternalTool</a>
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
                                    <a href="entities/ExternalTool.html" data-type="entity-link" >ExternalTool</a>
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
                                    <a href="entities/LtiTool.html" data-type="entity-link" >LtiTool</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Material.html" data-type="entity-link" >Material</a>
                                </li>
                                <li class="link">
                                    <a href="entities/News.html" data-type="entity-link" >News</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Pseudonym.html" data-type="entity-link" >Pseudonym</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/School.html" data-type="entity-link" >School</a>
                                </li>
                                <li class="link">
                                    <a href="entities/SchoolExternalTool.html" data-type="entity-link" >SchoolExternalTool</a>
                                </li>
                                <li class="link">
                                    <a href="entities/SchoolNews.html" data-type="entity-link" >SchoolNews</a>
                                </li>
                                <li class="link">
                                    <a href="entities/SchoolYear.html" data-type="entity-link" >SchoolYear</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ShareToken.html" data-type="entity-link" >ShareToken</a>
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
                                <li class="link">
                                    <a href="entities/VideoConference.html" data-type="entity-link" >VideoConference</a>
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
                                <a href="classes/AcceptQuery.html" data-type="entity-link" >AcceptQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountByIdBodyParams.html" data-type="entity-link" >AccountByIdBodyParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountByIdParams.html" data-type="entity-link" >AccountByIdParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountDto.html" data-type="entity-link" >AccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountEntityToDtoMapper.html" data-type="entity-link" >AccountEntityToDtoMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountFactory.html" data-type="entity-link" >AccountFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountResponse.html" data-type="entity-link" >AccountResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountResponseMapper.html" data-type="entity-link" >AccountResponseMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountSaveDto.html" data-type="entity-link" >AccountSaveDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountSearchListResponse.html" data-type="entity-link" >AccountSearchListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountSearchQueryParams.html" data-type="entity-link" >AccountSearchQueryParams</a>
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
                                <a href="classes/BaseDO.html" data-type="entity-link" >BaseDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseDomainObject.html" data-type="entity-link" >BaseDomainObject</a>
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
                                <a href="classes/BasePermission.html" data-type="entity-link" >BasePermission</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasePermissionManager.html" data-type="entity-link" >BasePermissionManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseSelectStrategie.html" data-type="entity-link" >BaseSelectStrategie</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseWithTimestampsDO.html" data-type="entity-link" >BaseWithTimestampsDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasicToolConfig.html" data-type="entity-link" >BasicToolConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasicToolConfigDO.html" data-type="entity-link" >BasicToolConfigDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasicToolConfigParams.html" data-type="entity-link" >BasicToolConfigParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasicToolConfigResponse.html" data-type="entity-link" >BasicToolConfigResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BBBBaseMeetingConfig.html" data-type="entity-link" >BBBBaseMeetingConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/BBBCreateConfig.html" data-type="entity-link" >BBBCreateConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/BBBCreateConfigBuilder.html" data-type="entity-link" >BBBCreateConfigBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/BBBJoinConfig.html" data-type="entity-link" >BBBJoinConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/BBBJoinConfigBuilder.html" data-type="entity-link" >BBBJoinConfigBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardElementResponse.html" data-type="entity-link" >BoardElementResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardLessonResponse.html" data-type="entity-link" >BoardLessonResponse</a>
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
                                <a href="classes/Builder.html" data-type="entity-link" >Builder</a>
                            </li>
                            <li class="link">
                                <a href="classes/BusinessError.html" data-type="entity-link" >BusinessError</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarEventDto.html" data-type="entity-link" >CalendarEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChallengeParams.html" data-type="entity-link" >ChallengeParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeLanguageParams.html" data-type="entity-link" >ChangeLanguageParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonCartridgeAssignmentElement.html" data-type="entity-link" >CommonCartridgeAssignmentElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonCartridgeAssignmentResourceItemElement.html" data-type="entity-link" >CommonCartridgeAssignmentResourceItemElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonCartridgeFileBuilder.html" data-type="entity-link" >CommonCartridgeFileBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonCartridgeMetadataElement.html" data-type="entity-link" >CommonCartridgeMetadataElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonCartridgeOrganizationItemElement.html" data-type="entity-link" >CommonCartridgeOrganizationItemElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonCartridgeOrganizationWrapperElement.html" data-type="entity-link" >CommonCartridgeOrganizationWrapperElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonCartridgeResourceItemElement.html" data-type="entity-link" >CommonCartridgeResourceItemElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonCartridgeResourceWrapperElement.html" data-type="entity-link" >CommonCartridgeResourceWrapperElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConsentRequestBody.html" data-type="entity-link" >ConsentRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConsentResponse.html" data-type="entity-link" >ConsentResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConsentSessionResponse.html" data-type="entity-link" >ConsentSessionResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/CookiesDto.html" data-type="entity-link" >CookiesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyApiResponse.html" data-type="entity-link" >CopyApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFileDto.html" data-type="entity-link" >CopyFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFileListResponse.html" data-type="entity-link" >CopyFileListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFileParams.html" data-type="entity-link" >CopyFileParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFileResponse.html" data-type="entity-link" >CopyFileResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFileResponseBuilder.html" data-type="entity-link" >CopyFileResponseBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFilesOfParentParamBuilder.html" data-type="entity-link" >CopyFilesOfParentParamBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFilesOfParentParams.html" data-type="entity-link" >CopyFilesOfParentParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyFilesOfParentPayload.html" data-type="entity-link" >CopyFilesOfParentPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyMapper.html" data-type="entity-link" >CopyMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseFactory.html" data-type="entity-link" >CourseFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseGroup.html" data-type="entity-link" >CourseGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseGroupFactory.html" data-type="entity-link" >CourseGroupFactory</a>
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
                                <a href="classes/CustomLtiProperty.html" data-type="entity-link" >CustomLtiProperty</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomParameter.html" data-type="entity-link" >CustomParameter</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomParameterCreateParams.html" data-type="entity-link" >CustomParameterCreateParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomParameterDO.html" data-type="entity-link" >CustomParameterDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomParameterEntry.html" data-type="entity-link" >CustomParameterEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomParameterResponse.html" data-type="entity-link" >CustomParameterResponse</a>
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
                                <a href="classes/DashboardUrlParams.html" data-type="entity-link" >DashboardUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseManagementConsole.html" data-type="entity-link" >DatabaseManagementConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteFilesConsole.html" data-type="entity-link" >DeleteFilesConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteOrphanedFilesConsole.html" data-type="entity-link" >DeleteOrphanedFilesConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/DownloadFileParams.html" data-type="entity-link" >DownloadFileParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/DtoCreator.html" data-type="entity-link" >DtoCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityNotFoundError.html" data-type="entity-link" >EntityNotFoundError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorMapper.html" data-type="entity-link" >ErrorMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponse.html" data-type="entity-link" >ErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolConfig.html" data-type="entity-link" >ExternalToolConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolConfigCreateParams.html" data-type="entity-link" >ExternalToolConfigCreateParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolConfigDO.html" data-type="entity-link" >ExternalToolConfigDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolConfigResponse.html" data-type="entity-link" >ExternalToolConfigResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolDO.html" data-type="entity-link" >ExternalToolDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolFactory.html" data-type="entity-link" >ExternalToolFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolParams.html" data-type="entity-link" >ExternalToolParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolResponse.html" data-type="entity-link" >ExternalToolResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolScope.html" data-type="entity-link" >ExternalToolScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolSearchListResponse.html" data-type="entity-link" >ExternalToolSearchListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExternalToolSearchParams.html" data-type="entity-link" >ExternalToolSearchParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileDto.html" data-type="entity-link" >FileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileDto-1.html" data-type="entity-link" >FileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileDtoBuilder.html" data-type="entity-link" >FileDtoBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileParamBuilder.html" data-type="entity-link" >FileParamBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileParams.html" data-type="entity-link" >FileParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilePermissionSchemaMapper.html" data-type="entity-link" >FilePermissionSchemaMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRecord.html" data-type="entity-link" >FileRecord</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRecordFactory.html" data-type="entity-link" >FileRecordFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRecordListResponse.html" data-type="entity-link" >FileRecordListResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileRecordMapper.html" data-type="entity-link" >FileRecordMapper</a>
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
                                <a href="classes/FileSecurityCheckMapper.html" data-type="entity-link" >FileSecurityCheckMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesStorageClientMapper.html" data-type="entity-link" >FilesStorageClientMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesStorageMapper.html" data-type="entity-link" >FilesStorageMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesStorageMapper-1.html" data-type="entity-link" >FilesStorageMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileSyncOptions.html" data-type="entity-link" >FileSyncOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUrlParams.html" data-type="entity-link" >FileUrlParams</a>
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
                                <a href="classes/HydraRedirectDto.html" data-type="entity-link" >HydraRedirectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdentityManagementService.html" data-type="entity-link" >IdentityManagementService</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdParams.html" data-type="entity-link" >IdParams</a>
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
                                <a href="classes/ImportUserUrlParams.html" data-type="entity-link" >ImportUserUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtExtractor.html" data-type="entity-link" >JwtExtractor</a>
                            </li>
                            <li class="link">
                                <a href="classes/KeycloakConfiguration.html" data-type="entity-link" >KeycloakConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/KeycloakConfigurationService.html" data-type="entity-link" >KeycloakConfigurationService</a>
                            </li>
                            <li class="link">
                                <a href="classes/KeycloakConsole.html" data-type="entity-link" >KeycloakConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/KeycloakSeedService.html" data-type="entity-link" >KeycloakSeedService</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessonCopyApiParams.html" data-type="entity-link" >LessonCopyApiParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessonFactory.html" data-type="entity-link" >LessonFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessonScope.html" data-type="entity-link" >LessonScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessonUrlParams.html" data-type="entity-link" >LessonUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessonUrlParams-1.html" data-type="entity-link" >LessonUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListOauthClientsParams.html" data-type="entity-link" >ListOauthClientsParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginRequestBody.html" data-type="entity-link" >LoginRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponse.html" data-type="entity-link" >LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lti11LaunchParams.html" data-type="entity-link" >Lti11LaunchParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lti11LaunchQuery.html" data-type="entity-link" >Lti11LaunchQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lti11LaunchResponse.html" data-type="entity-link" >Lti11LaunchResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lti11PayloadDto.html" data-type="entity-link" >Lti11PayloadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lti11ToolConfig.html" data-type="entity-link" >Lti11ToolConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lti11ToolConfigDO.html" data-type="entity-link" >Lti11ToolConfigDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lti11ToolConfigParams.html" data-type="entity-link" >Lti11ToolConfigParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lti11ToolConfigResponse.html" data-type="entity-link" >Lti11ToolConfigResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/LtiToolDO.html" data-type="entity-link" >LtiToolDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LtiToolFactory.html" data-type="entity-link" >LtiToolFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/MaterialFactory.html" data-type="entity-link" >MaterialFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/MetadataTypeMapper.html" data-type="entity-link" >MetadataTypeMapper</a>
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
                                <a href="classes/NewsUrlParams.html" data-type="entity-link" >NewsUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/Oauth2ToolConfig.html" data-type="entity-link" >Oauth2ToolConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/Oauth2ToolConfigDO.html" data-type="entity-link" >Oauth2ToolConfigDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Oauth2ToolConfigParams.html" data-type="entity-link" >Oauth2ToolConfigParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/Oauth2ToolConfigResponse.html" data-type="entity-link" >Oauth2ToolConfigResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/OauthClientBody.html" data-type="entity-link" >OauthClientBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/OauthClientResponse.html" data-type="entity-link" >OauthClientResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/OauthConfig.html" data-type="entity-link" >OauthConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/OauthConfigDto.html" data-type="entity-link" >OauthConfigDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OauthConfigResponse.html" data-type="entity-link" >OauthConfigResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/OauthProviderService.html" data-type="entity-link" >OauthProviderService</a>
                            </li>
                            <li class="link">
                                <a href="classes/OAuthRejectableBody.html" data-type="entity-link" >OAuthRejectableBody</a>
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
                                <a href="classes/OidcConfigDto.html" data-type="entity-link" >OidcConfigDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OidcContextResponse.html" data-type="entity-link" >OidcContextResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/OidcIdentityProviderMapper.html" data-type="entity-link" >OidcIdentityProviderMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/Page.html" data-type="entity-link" >Page</a>
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
                                <a href="classes/PermissionContextBuilder.html" data-type="entity-link" >PermissionContextBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProvisioningDto.html" data-type="entity-link" >ProvisioningDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProvisioningSchoolOutputDto.html" data-type="entity-link" >ProvisioningSchoolOutputDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProvisioningStrategy.html" data-type="entity-link" >ProvisioningStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProvisioningSystemInputDto.html" data-type="entity-link" >ProvisioningSystemInputDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProvisioningSystemInputMapper.html" data-type="entity-link" >ProvisioningSystemInputMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProvisioningUserOutputDto.html" data-type="entity-link" >ProvisioningUserOutputDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pseudonym.html" data-type="entity-link" >Pseudonym</a>
                            </li>
                            <li class="link">
                                <a href="classes/PseudonymDO.html" data-type="entity-link" >PseudonymDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedirectResponse.html" data-type="entity-link" >RedirectResponse</a>
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
                                <a href="classes/RevokeConsentParams.html" data-type="entity-link" >RevokeConsentParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/RichText.html" data-type="entity-link" >RichText</a>
                            </li>
                            <li class="link">
                                <a href="classes/RocketChatError.html" data-type="entity-link" >RocketChatError</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleDto.html" data-type="entity-link" >RoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleMapper.html" data-type="entity-link" >RoleMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleNameMapper.html" data-type="entity-link" >RoleNameMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoomElementUrlParams.html" data-type="entity-link" >RoomElementUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoomUrlParams.html" data-type="entity-link" >RoomUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SanisResponse.html" data-type="entity-link" >SanisResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/SanisResponseName.html" data-type="entity-link" >SanisResponseName</a>
                            </li>
                            <li class="link">
                                <a href="classes/SanisResponseOrganisation.html" data-type="entity-link" >SanisResponseOrganisation</a>
                            </li>
                            <li class="link">
                                <a href="classes/SanisResponsePersonenkontext.html" data-type="entity-link" >SanisResponsePersonenkontext</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScanResultParams.html" data-type="entity-link" >ScanResultParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/School.html" data-type="entity-link" >School</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolDto.html" data-type="entity-link" >SchoolDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolInfoMapper.html" data-type="entity-link" >SchoolInfoMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolInfoResponse.html" data-type="entity-link" >SchoolInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolMapper.html" data-type="entity-link" >SchoolMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolRolePermission.html" data-type="entity-link" >SchoolRolePermission</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolRoles.html" data-type="entity-link" >SchoolRoles</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolUcMapper.html" data-type="entity-link" >SchoolUcMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/Scope.html" data-type="entity-link" >Scope</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerConsole.html" data-type="entity-link" >ServerConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenBodyParams.html" data-type="entity-link" >ShareTokenBodyParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenContextTypeMapper.html" data-type="entity-link" >ShareTokenContextTypeMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenDO.html" data-type="entity-link" >ShareTokenDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenFactory.html" data-type="entity-link" >ShareTokenFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenImportBodyParams.html" data-type="entity-link" >ShareTokenImportBodyParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenInfoResponse.html" data-type="entity-link" >ShareTokenInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenInfoResponseMapper.html" data-type="entity-link" >ShareTokenInfoResponseMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenParentTypeMapper.html" data-type="entity-link" >ShareTokenParentTypeMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenPayloadResponse.html" data-type="entity-link" >ShareTokenPayloadResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenResponse.html" data-type="entity-link" >ShareTokenResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenResponseMapper.html" data-type="entity-link" >ShareTokenResponseMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareTokenUrlParams.html" data-type="entity-link" >ShareTokenUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SingleFileParams.html" data-type="entity-link" >SingleFileParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SingleSelectStrategie.html" data-type="entity-link" >SingleSelectStrategie</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortExternalToolParams.html" data-type="entity-link" >SortExternalToolParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortImportUserParams.html" data-type="entity-link" >SortImportUserParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortingParams.html" data-type="entity-link" >SortingParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/StorageProviderEncryptedStringType.html" data-type="entity-link" >StorageProviderEncryptedStringType</a>
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
                                <a href="classes/SyncFileItem.html" data-type="entity-link" >SyncFileItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncFileItemMapper.html" data-type="entity-link" >SyncFileItemMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncFilesConsole.html" data-type="entity-link" >SyncFilesConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncSourceFile.html" data-type="entity-link" >SyncSourceFile</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncSourceFileMapper.html" data-type="entity-link" >SyncSourceFileMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncSourceFilePermission.html" data-type="entity-link" >SyncSourceFilePermission</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncSourceFileSecurityCheck.html" data-type="entity-link" >SyncSourceFileSecurityCheck</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncTargetFile.html" data-type="entity-link" >SyncTargetFile</a>
                            </li>
                            <li class="link">
                                <a href="classes/SyncTargetFileMapper.html" data-type="entity-link" >SyncTargetFileMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemDto.html" data-type="entity-link" >SystemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemFactory.html" data-type="entity-link" >SystemFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemFilterParams.html" data-type="entity-link" >SystemFilterParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemMapper.html" data-type="entity-link" >SystemMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemOauthResponse.html" data-type="entity-link" >SystemOauthResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemOauthResponseMapper.html" data-type="entity-link" >SystemOauthResponseMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemResponse.html" data-type="entity-link" >SystemResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemScope.html" data-type="entity-link" >SystemScope</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemUrlParams.html" data-type="entity-link" >SystemUrlParams</a>
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
                                <a href="classes/TaskCopyApiParams.html" data-type="entity-link" >TaskCopyApiParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskCreateParams.html" data-type="entity-link" >TaskCreateParams</a>
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
                                <a href="classes/TaskUpdateParams.html" data-type="entity-link" >TaskUpdateParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskUrlParams.html" data-type="entity-link" >TaskUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskWithStatusVo.html" data-type="entity-link" >TaskWithStatusVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamDto.html" data-type="entity-link" >TeamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamFactory.html" data-type="entity-link" >TeamFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamPermissionsBody.html" data-type="entity-link" >TeamPermissionsBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamPermissionsDto.html" data-type="entity-link" >TeamPermissionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamRoleDto.html" data-type="entity-link" >TeamRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamRolePermissionsDto.html" data-type="entity-link" >TeamRolePermissionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamUrlParams.html" data-type="entity-link" >TeamUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamUser.html" data-type="entity-link" >TeamUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamUserDto.html" data-type="entity-link" >TeamUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamUserFactory.html" data-type="entity-link" >TeamUserFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestBootstrapConsole.html" data-type="entity-link" >TestBootstrapConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenRequestMapper.html" data-type="entity-link" >TokenRequestMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenRequestPayload.html" data-type="entity-link" >TokenRequestPayload</a>
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
                                <a href="classes/UserDO.html" data-type="entity-link" >UserDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
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
                                <a href="classes/UserMapper.html" data-type="entity-link" >UserMapper</a>
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
                                <a href="classes/UserParams.html" data-type="entity-link" >UserParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserUcMapper.html" data-type="entity-link" >UserUcMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationError.html" data-type="entity-link" >ValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationErrorDetailResponse.html" data-type="entity-link" >ValidationErrorDetailResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConference.html" data-type="entity-link" >VideoConference</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceBaseResponse.html" data-type="entity-link" >VideoConferenceBaseResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceCreateParams.html" data-type="entity-link" >VideoConferenceCreateParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceDO.html" data-type="entity-link" >VideoConferenceDO</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceDTO.html" data-type="entity-link" >VideoConferenceDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceInfoDTO.html" data-type="entity-link" >VideoConferenceInfoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceInfoResponse.html" data-type="entity-link" >VideoConferenceInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceJoinDTO.html" data-type="entity-link" >VideoConferenceJoinDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceJoinResponse.html" data-type="entity-link" >VideoConferenceJoinResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceOptions.html" data-type="entity-link" >VideoConferenceOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoConferenceOptionsDO.html" data-type="entity-link" >VideoConferenceOptionsDO</a>
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
                                    <a href="injectables/AuthorisationUtils.html" data-type="entity-link" >AuthorisationUtils</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseDORepo.html" data-type="entity-link" >BaseDORepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseRepo.html" data-type="entity-link" >BaseRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BBBService.html" data-type="entity-link" >BBBService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BoardRepo.html" data-type="entity-link" >BoardRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarMapper.html" data-type="entity-link" >CalendarMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarService.html" data-type="entity-link" >CalendarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CollaborativeStorageAdapterMapper.html" data-type="entity-link" >CollaborativeStorageAdapterMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CollaborativeStorageService.html" data-type="entity-link" >CollaborativeStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConverterUtil.html" data-type="entity-link" >ConverterUtil</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CopyHelperService.html" data-type="entity-link" >CopyHelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseExternalToolRepo.html" data-type="entity-link" >CourseExternalToolRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseGroupRepo.html" data-type="entity-link" >CourseGroupRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseGroupRule.html" data-type="entity-link" >CourseGroupRule</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseRepo.html" data-type="entity-link" >CourseRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseRule.html" data-type="entity-link" >CourseRule</a>
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
                                    <a href="injectables/DeleteOrphanedFilesUc.html" data-type="entity-link" >DeleteOrphanedFilesUc</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DurationLoggingInterceptor.html" data-type="entity-link" >DurationLoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EtherpadService.html" data-type="entity-link" >EtherpadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExternalToolRepo.html" data-type="entity-link" >ExternalToolRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExternalToolRepoMapper.html" data-type="entity-link" >ExternalToolRepoMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExternalToolSortingMapper.html" data-type="entity-link" >ExternalToolSortingMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileCopyAppendService.html" data-type="entity-link" >FileCopyAppendService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileLegacyService.html" data-type="entity-link" >FileLegacyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileRecordRepo.html" data-type="entity-link" >FileRecordRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesRepo.html" data-type="entity-link" >FilesRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesStorageConsumer.html" data-type="entity-link" >FilesStorageConsumer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesStorageUC.html" data-type="entity-link" >FilesStorageUC</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileStorageAdapter.html" data-type="entity-link" >FileStorageAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HydraAdapter.html" data-type="entity-link" >HydraAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HydraOauthUc.html" data-type="entity-link" >HydraOauthUc</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HydraSsoService.html" data-type="entity-link" >HydraSsoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImportUserRepo.html" data-type="entity-link" >ImportUserRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IservProvisioningStrategy.html" data-type="entity-link" >IservProvisioningStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KeycloakIdentityManagementService.html" data-type="entity-link" >KeycloakIdentityManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LessonRepo.html" data-type="entity-link" >LessonRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LessonRule.html" data-type="entity-link" >LessonRule</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LessonService.html" data-type="entity-link" >LessonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LessonUC.html" data-type="entity-link" >LessonUC</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LtiToolRepo.html" data-type="entity-link" >LtiToolRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MaterialsRepo.html" data-type="entity-link" >MaterialsRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsRepo.html" data-type="entity-link" >NewsRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NexboardService.html" data-type="entity-link" >NexboardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NextcloudClient.html" data-type="entity-link" >NextcloudClient</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NextcloudStrategy.html" data-type="entity-link" >NextcloudStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OauthProviderLogoutFlowUc.html" data-type="entity-link" >OauthProviderLogoutFlowUc</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OAuthService.html" data-type="entity-link" >OAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionService.html" data-type="entity-link" >PermissionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProvisioningService.html" data-type="entity-link" >ProvisioningService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PseudonymsRepo.html" data-type="entity-link" >PseudonymsRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestLoggingInterceptor.html" data-type="entity-link" >RequestLoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RocketChatService.html" data-type="entity-link" >RocketChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleRepo.html" data-type="entity-link" >RoleRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleService.html" data-type="entity-link" >RoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleUc.html" data-type="entity-link" >RoleUc</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SanisProvisioningStrategy.html" data-type="entity-link" >SanisProvisioningStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SanisResponseMapper.html" data-type="entity-link" >SanisResponseMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SanisSchoolService.html" data-type="entity-link" >SanisSchoolService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SanisUserService.html" data-type="entity-link" >SanisUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolExternalToolRepo.html" data-type="entity-link" >SchoolExternalToolRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolRepo.html" data-type="entity-link" >SchoolRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolRule.html" data-type="entity-link" >SchoolRule</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolService.html" data-type="entity-link" >SchoolService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolUc.html" data-type="entity-link" >SchoolUc</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolYearRepo.html" data-type="entity-link" >SchoolYearRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShareTokenRepo.html" data-type="entity-link" >ShareTokenRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShareTokenService.html" data-type="entity-link" >ShareTokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShareTokenUC.html" data-type="entity-link" >ShareTokenUC</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageProviderRepo.html" data-type="entity-link" >StorageProviderRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubmissionRepo.html" data-type="entity-link" >SubmissionRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubmissionRule.html" data-type="entity-link" >SubmissionRule</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SymetricKeyEncryptionService.html" data-type="entity-link" >SymetricKeyEncryptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SyncFilesUc.html" data-type="entity-link" >SyncFilesUc</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SystemRepo.html" data-type="entity-link" >SystemRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SystemService.html" data-type="entity-link" >SystemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SystemUc.html" data-type="entity-link" >SystemUc</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskCopyService.html" data-type="entity-link" >TaskCopyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskCopyUC.html" data-type="entity-link" >TaskCopyUC</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskRepo.html" data-type="entity-link" >TaskRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskRule.html" data-type="entity-link" >TaskRule</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskUC.html" data-type="entity-link" >TaskUC</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamMapper.html" data-type="entity-link" >TeamMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamPermissionsMapper.html" data-type="entity-link" >TeamPermissionsMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamRule.html" data-type="entity-link" >TeamRule</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamsRepo.html" data-type="entity-link" >TeamsRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenGenerator.html" data-type="entity-link" >TokenGenerator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserDORepo.html" data-type="entity-link" >UserDORepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserRepo.html" data-type="entity-link" >UserRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserRule.html" data-type="entity-link" >UserRule</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserUc.html" data-type="entity-link" >UserUc</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VideoConferenceRepo.html" data-type="entity-link" >VideoConferenceRepo</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VideoConferenceResponseMapper.html" data-type="entity-link" >VideoConferenceResponseMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VideoConferenceUc.html" data-type="entity-link" >VideoConferenceUc</a>
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
                                <a href="interfaces/AcceptConsentRequestBody.html" data-type="entity-link" >AcceptConsentRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AcceptLoginRequestBody.html" data-type="entity-link" >AcceptLoginRequestBody</a>
                            </li>
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
                                <a href="interfaces/BBBBaseResponse.html" data-type="entity-link" >BBBBaseResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BBBCreateResponse.html" data-type="entity-link" >BBBCreateResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BBBJoinResponse.html" data-type="entity-link" >BBBJoinResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BBBMeetingInfoResponse.html" data-type="entity-link" >BBBMeetingInfoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BBBResponse.html" data-type="entity-link" >BBBResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomLtiProperty.html" data-type="entity-link" >CustomLtiProperty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DashboardGridElementModelProperties.html" data-type="entity-link" >DashboardGridElementModelProperties</a>
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
                                <a href="interfaces/GroupfoldersCreated.html" data-type="entity-link" >GroupfoldersCreated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupfoldersFolder.html" data-type="entity-link" >GroupfoldersFolder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupNameIdTuple.html" data-type="entity-link" >GroupNameIdTuple</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupUsers.html" data-type="entity-link" >GroupUsers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HtmlMailContent.html" data-type="entity-link" >HtmlMailContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAccount.html" data-type="entity-link" >IAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAccountConfig.html" data-type="entity-link" >IAccountConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAccountUpdate.html" data-type="entity-link" >IAccountUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseEntityProps.html" data-type="entity-link" >IBaseEntityProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICalendarEvent.html" data-type="entity-link" >ICalendarEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICollaborativeStorageStrategy.html" data-type="entity-link" >ICollaborativeStorageStrategy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICollectionFilePath.html" data-type="entity-link" >ICollectionFilePath</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICommonCartridgeElement.html" data-type="entity-link" >ICommonCartridgeElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComponentEtherpadProperties.html" data-type="entity-link" >IComponentEtherpadProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComponentGeogebraProperties.html" data-type="entity-link" >IComponentGeogebraProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComponentInternalProperties.html" data-type="entity-link" >IComponentInternalProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComponentLernstoreProperties.html" data-type="entity-link" >IComponentLernstoreProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComponentNexboardProperties.html" data-type="entity-link" >IComponentNexboardProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComponentProperties.html" data-type="entity-link" >IComponentProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComponentTextProperties.html" data-type="entity-link" >IComponentTextProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICopyFileDO.html" data-type="entity-link" >ICopyFileDO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICopyFileDomainObjectProps.html" data-type="entity-link" >ICopyFileDomainObjectProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICopyFiles.html" data-type="entity-link" >ICopyFiles</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICopyFilesOfParentParams.html" data-type="entity-link" >ICopyFilesOfParentParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICopyFilesRequestInfo.html" data-type="entity-link" >ICopyFilesRequestInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICoreModuleConfig.html" data-type="entity-link" >ICoreModuleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICourseExternalToolProperties.html" data-type="entity-link" >ICourseExternalToolProperties</a>
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
                                <a href="interfaces/IdToken.html" data-type="entity-link" >IdToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEncryptionService.html" data-type="entity-link" >IEncryptionService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEntity.html" data-type="entity-link" >IEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEntityWithSchool.html" data-type="entity-link" >IEntityWithSchool</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEntityWithTimestamps.html" data-type="entity-link" >IEntityWithTimestamps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IError.html" data-type="entity-link" >IError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IErrorType.html" data-type="entity-link" >IErrorType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFeatureConfig.html" data-type="entity-link" >IFeatureConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileDO.html" data-type="entity-link" >IFileDO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileDomainObjectProps.html" data-type="entity-link" >IFileDomainObjectProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileProperties.html" data-type="entity-link" >IFileProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileRecordParams.html" data-type="entity-link" >IFileRecordParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileRecordProperties.html" data-type="entity-link" >IFileRecordProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileRequestInfo.html" data-type="entity-link" >IFileRequestInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileSecurityCheckProperties.html" data-type="entity-link" >IFileSecurityCheckProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFilesStorageClientConfig.html" data-type="entity-link" >IFilesStorageClientConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileStorageConfig.html" data-type="entity-link" >IFileStorageConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileStorageErrors.html" data-type="entity-link" >IFileStorageErrors</a>
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
                                <a href="interfaces/IIdentityProviderConfig.html" data-type="entity-link" >IIdentityProviderConfig</a>
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
                                <a href="interfaces/IJsonAccount.html" data-type="entity-link" >IJsonAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJsonUser.html" data-type="entity-link" >IJsonUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJwt.html" data-type="entity-link" >IJwt</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IKeycloakManagementInputFiles.html" data-type="entity-link" >IKeycloakManagementInputFiles</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IKeycloakSettings.html" data-type="entity-link" >IKeycloakSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILdapIdentityProviderConfig.html" data-type="entity-link" >ILdapIdentityProviderConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILearnroom.html" data-type="entity-link" >ILearnroom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILearnroomElement.html" data-type="entity-link" >ILearnroomElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILessonParent.html" data-type="entity-link" >ILessonParent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILessonProperties.html" data-type="entity-link" >ILessonProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogger.html" data-type="entity-link" >ILogger</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILoggerConfig.html" data-type="entity-link" >ILoggerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMaterialProperties.html" data-type="entity-link" >IMaterialProperties</a>
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
                                <a href="interfaces/IntrospectResponse.html" data-type="entity-link" >IntrospectResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOidcIdentityProviderConfig.html" data-type="entity-link" >IOidcIdentityProviderConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPagination.html" data-type="entity-link" >IPagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPermission.html" data-type="entity-link" >IPermission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPermissionContext.html" data-type="entity-link" >IPermissionContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IReferenceId.html" data-type="entity-link" >IReferenceId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRelatedResourceProperties.html" data-type="entity-link" >IRelatedResourceProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRepoLoader.html" data-type="entity-link" >IRepoLoader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResolvedUser.html" data-type="entity-link" >IResolvedUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRetryOptions.html" data-type="entity-link" >IRetryOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRole.html" data-type="entity-link" >IRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRoleProperties.html" data-type="entity-link" >IRoleProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISchoolExternalToolProperties.html" data-type="entity-link" >ISchoolExternalToolProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISchoolProperties.html" data-type="entity-link" >ISchoolProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISchoolYearProperties.html" data-type="entity-link" >ISchoolYearProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScopeInfo.html" data-type="entity-link" >IScopeInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IServerConfig.html" data-type="entity-link" >IServerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IShareTokenProperties.html" data-type="entity-link" >IShareTokenProperties</a>
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
                                <a href="interfaces/ISyncData.html" data-type="entity-link" >ISyncData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISystemProperties.html" data-type="entity-link" >ISystemProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITargetGroupProperties.html" data-type="entity-link" >ITargetGroupProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITask.html" data-type="entity-link" >ITask</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskCreate.html" data-type="entity-link" >ITaskCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskParent.html" data-type="entity-link" >ITaskParent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskProperties.html" data-type="entity-link" >ITaskProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskStatus.html" data-type="entity-link" >ITaskStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskUpdate.html" data-type="entity-link" >ITaskUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITeamProperties.html" data-type="entity-link" >ITeamProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITeamUserProperties.html" data-type="entity-link" >ITeamUserProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserConfig.html" data-type="entity-link" >IUserConfig</a>
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
                                <a href="interfaces/Meta.html" data-type="entity-link" >Meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewsTargetFilter.html" data-type="entity-link" >NewsTargetFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NextcloudGroups.html" data-type="entity-link" >NextcloudGroups</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OcsResponse.html" data-type="entity-link" >OcsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Options.html" data-type="entity-link" >Options</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlainTextMailContent.html" data-type="entity-link" >PlainTextMailContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderConsentResponse.html" data-type="entity-link" >ProviderConsentResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderConsentSessionResponse.html" data-type="entity-link" >ProviderConsentSessionResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderLoginResponse.html" data-type="entity-link" >ProviderLoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderOauthClient.html" data-type="entity-link" >ProviderOauthClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderOidcContext.html" data-type="entity-link" >ProviderOidcContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderRedirectResponse.html" data-type="entity-link" >ProviderRedirectResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RejectRequestBody.html" data-type="entity-link" >RejectRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RocketChatOptions.html" data-type="entity-link" >RocketChatOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RpcMessage.html" data-type="entity-link" >RpcMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/S3Config.html" data-type="entity-link" >S3Config</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShareTokenInfoDto.html" data-type="entity-link" >ShareTokenInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SuccessfulRes.html" data-type="entity-link" >SuccessfulRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoConferenceOptions.html" data-type="entity-link" >VideoConferenceOptions</a>
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
/**
 * Proyecto: Independizate
 * Descripción: Fichero de test para el componente companero-piso.
 * 
 * Archivo: companero-piso.component.spec.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompaneroPisoComponent } from './companero-piso.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackendService } from '../../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../../services/error/error.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import CUSTOM_ELEMENTS_SCHEMA
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Import NO_ERRORS_SCHEMA

describe('CompaneroPisoComponent', () => {
  let component: CompaneroPisoComponent;
  let fixture: ComponentFixture<CompaneroPisoComponent>;
  let backendServiceMock: jasmine.SpyObj<BackendService>;
  let errorServiceMock: jasmine.SpyObj<ErrorService>;
  let routerMock: jasmine.SpyObj<Router>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const backendService = jasmine.createSpyObj('BackendService', [
      'getProfilesId',
      'getForumCategoriaPostsFavs',
      'getForumCategoriaPosts',
      'putPostsLikePostId',
      'putPostsFavoritesPostId',
      'getCookie', 
      'setCookie' 
    ]);

    backendService.cookie = { esInvitado: false, usuario: 'testUser' };
    backendService.getProfilesId.and.returnValue(of({ user: { forosFavoritos: [], forosLike: [] } }));
    backendService.getForumCategoriaPostsFavs.and.returnValue(of({ posts: [] }));
    backendService.getForumCategoriaPosts.and.returnValue(of({ posts: [] }));
    backendService.putPostsLikePostId.and.returnValue(of({}));
    backendService.putPostsFavoritesPostId.and.returnValue(of({}));

    const errorService = jasmine.createSpyObj('ErrorService', ['openDialogError']);
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [CompaneroPisoComponent],
      schemas: [ 
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
       ],
      imports: [MatDialogModule],
      providers: [
        { provide: BackendService, useValue: backendService },
        { provide: ErrorService, useValue: errorService },
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog }
      ]
    }).compileComponents();

    backendServiceMock = TestBed.inject(BackendService) as jasmine.SpyObj<BackendService>;
    errorServiceMock = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dialogMock = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaneroPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debeberia manejar la recogida de post de invitados', () => {
    backendServiceMock.getCookie.and.returnValue({ usuario: '', nombreUsuario: '', token: '', esInvitado: false });
    var cockie = backendServiceMock.getCookie();
    if (cockie) {
      backendServiceMock.getCookie.and.returnValue(cockie);
      cockie.esInvitado = true;
      backendServiceMock.setCookie(cockie);
    }
    component.ngOnInit();
    expect(backendServiceMock.getForumCategoriaPosts).toHaveBeenCalledWith('compagneroDePiso');
  });
    
  it('Debería manejar darle like a un post', () => {
    component.darLike('post1');
    expect(backendServiceMock.putPostsLikePostId).toHaveBeenCalledWith('post1');
  });

  it('Debería manejar los posts favoritos', () => {
    component.hacerFav('post1');
    expect(backendServiceMock.putPostsFavoritesPostId).toHaveBeenCalledWith('post1');
  });

  it('Debería abrir el dialogo para reportar un post', () => {
    component.openDialogDenuncia('250ms', '200ms', 'post1');
    expect(dialogMock.open).toHaveBeenCalled();
  });
  
  it('Debería actualizar los posts en la búsqueda', () => {
    component['todos'] = [{ title: 'testTitle', description: 'testDescription' }];
    component.buscar();
    expect(component.posts.length).toBe(1);
  });

});
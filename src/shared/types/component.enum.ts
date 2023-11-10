export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  PathTransformer: Symbol.for('PathTransformer'),

  ExceptionFilter: Symbol.for('ExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),

  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),

  AuthService: Symbol.for('AuthService'),
  AuthExceptionFilter: Symbol.for('AuthExceptionFilter'),

  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  OfferController: Symbol.for('OfferController'),

  CommentModel: Symbol.for('CommentModel'),
  CommentService: Symbol.for('CommentService'),
  CommentController: Symbol.for('CommentController'),
} as const;

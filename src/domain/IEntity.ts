/**
 * Implemente esta interface em qualquer classe que represente um documento a ser persistido no banco.
 *
 * @author emil
 * @since 1.0
 */
export interface IEntity {

    /**
     * Id usado pelo PouchDB
     *
     * @since 1.0
     */
    _id: string;

    /**
     * Chave que identifica o tipo de documento, o tipo de tabela. Exemplo: 'event', 'presence', 'event-type'.
     *
     * @since 1.0
     */
    key: string;

    /**
     * Por padrão documentos no pouchdb devem ter um id inserido (manualmente)
     * é conveniente que o id contenha informações suficientes sobre o que está sendo salvo para evitar
     * queries com map reduce.
     * http://pouchdb.com/2014/05/01/secondary-indexes-have-landed-in-pouchdb.html
     * https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html
     *
     * @return Id gerado a partir dos atributos da entidade.
     *
     * @since 1.0
     */
    createId(): string;
}
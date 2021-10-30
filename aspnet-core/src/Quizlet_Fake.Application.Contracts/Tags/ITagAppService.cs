using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Quizlet_Fake.Tags
{
 
    public interface ITagAppService :
        ICrudAppService< //Defines CRUD methods
           TagDto, //Used to show 
           Guid, //Primary key of the  entity
           PagedAndSortedResultRequestDto, //Used for paging/sorting
           TagCreateOrUpdate> //Used to create/update 
    {
    }
}
